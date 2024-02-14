package com.xdev.merch.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.client.http.FileContent;
import com.google.api.client.util.DateTime;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

@Service
public class GoogleDriveService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GoogleDriveService.class);

    private static final String APPLICATION_NAME = "Printy";
    private static final String CREDENTIALS_FILE_PATH = "classpath:drive/cred.json";

    private final Drive driveService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public GoogleDriveService(ResourceLoader resourceLoader) throws IOException {
        this.resourceLoader = resourceLoader;
        GoogleCredential credential = loadCredentials();
        driveService =
            new Drive.Builder(credential.getTransport(), credential.getJsonFactory(), credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private GoogleCredential loadCredentials() throws IOException {
        Resource resource = resourceLoader.getResource(CREDENTIALS_FILE_PATH);
        System.out.println("Resource Path: " + resource.getURL().getPath());

        try (InputStream inputStream = resource.getInputStream()) {
            return GoogleCredential.fromStream(inputStream).createScoped(Collections.singleton(DriveScopes.DRIVE));
        }
    }

    public String uploadFile(byte[] fileBytes, String fileName) {
        try {
            byte[] zipBytes = compressToZip(fileBytes, fileName);
            File fileMetadata = new File().setName(fileName + ".zip");
            ByteArrayContent mediaContent = new ByteArrayContent("application/zip", zipBytes);
            LOGGER.info("Uploading file: {}", fileName);
            File uploadedFile = driveService.files().create(fileMetadata, mediaContent).setFields("id").execute();

            String fileId = uploadedFile.getId();
            LOGGER.info("File uploaded with id: {}", fileId);
            return fileId;
        } catch (IOException e) {
            LOGGER.error("Error uploading file: {}", e.getMessage(), e);
            return null;
        }
    }

    public String generateShareableLink(String fileId) {
        try {
            Permission permission = new Permission().setType("anyone").setRole("reader");
            // Assuming you want the link to expire after 60 days
            long expirationTimeMillis = System.currentTimeMillis() + 60L * 24L * 60L * 60L * 1000L;
            permission.setExpirationTime(new com.google.api.client.util.DateTime(expirationTimeMillis));

            LOGGER.info("Setting file permission: {} and expirationDate: {}", permission, permission.getExpirationTime());
            driveService.permissions().create(fileId, permission).execute();

            return driveService.files().get(fileId).setFields("webViewLink").execute().getWebViewLink();
        } catch (IOException e) {
            LOGGER.error("Error generating shareable link: {}", e.getMessage(), e);
            return null;
        }
    }

    private byte[] compressToZip(byte[] fileBytes, String fileName) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream)) {
            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOutputStream.putNextEntry(zipEntry);
            zipOutputStream.write(fileBytes);
            zipOutputStream.closeEntry();
        }
        return byteArrayOutputStream.toByteArray();
    }
}
