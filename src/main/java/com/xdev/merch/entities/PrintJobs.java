package com.xdev.merch.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "print_jobs")
public class PrintJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @ManyToOne
    @JoinColumn(name = "id")
    private Users users;

    @Column(name = "job_name")
    private String jobName;

    @Column(name = "job_link")
    private String jobLink;

    @Column(name = "job_description")
    private String jobDescription;

    @Column(name = "job_image_url")
    private String jobImageUrl;

    @Column(name = "job_creation_date")
    private LocalDateTime jobCreationDate;

    @Column(name = "vending_platform_link")
    private String vendingPlatformLink;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
