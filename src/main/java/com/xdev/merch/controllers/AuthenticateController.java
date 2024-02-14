package com.xdev.merch.controllers;

import static com.xdev.merch.security.SecurityUtils.AUTHORITIES_KEY;
import static com.xdev.merch.security.SecurityUtils.JWT_ALGORITHM;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.xdev.merch.controllers.vm.LoginVM;
import com.xdev.merch.entities.Users;
import com.xdev.merch.service.UsersService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api")
public class AuthenticateController {

    private static final long rememberMeDuration = 3600000; // Example duration in milliseconds (1 hour)
    private static final long tokenValidityDuration = 86400000; // Example duration in milliseconds (24 hours)
    private static final String secretKey = "yourSecretKey"; // Replace with your actual secret key

    private final Logger log = LoggerFactory.getLogger(AuthenticateController.class);
    private final JwtEncoder jwtEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;

    @Autowired
    UsersService usersService;

    @Value("${jhipster.security.authentication.jwt.token-validity-in-seconds:0}")
    private long tokenValidityInSeconds;

    @Value("${jhipster.security.authentication.jwt.token-validity-in-seconds-for-remember-me:0}")
    private long tokenValidityInSecondsForRememberMe;

    public AuthenticateController(
        JwtEncoder jwtEncoder,
        AuthenticationManagerBuilder authenticationManagerBuilder,
        TokenProvider tokenProvider
    ) {
        this.jwtEncoder = jwtEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            loginVM.getUsername(),
            loginVM.getPassword()
        );

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = this.createToken(authentication, loginVM.isRememberMe());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(jwt);
        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }

    @PostMapping(value = "/merchauth", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> mercherAuthorize(@RequestBody @Valid LoginVM loginVM) {
        // Mercher-specific authentication logic
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        Users mercher = usersService.findUsersByEmail(loginVM.getUsername()).orElse(null);

        if (mercher != null && passwordEncoder.matches(loginVM.getPassword(), mercher.getPassword())) {
            // Authentication successful
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginVM.getUsername(),
                loginVM.getPassword()
            );

            Authentication authentication = createAuthenticationToken(loginVM.getUsername());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // JWT creation
            String jwt = createTokenMerch(authentication, false);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBearerAuth(jwt);
            AuthResponse authResponse = new AuthResponse(jwt, mercher);
            return new ResponseEntity<>(authResponse, httpHeaders, HttpStatus.OK);
        } else {
            // Authentication failed
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    public class AuthResponse {

        private String token;
        private Users user;

        // Constructors, getters, and setters

        public AuthResponse(String token, Users user) {
            this.token = token;
            this.user = user;
        }
        // Additional getters and setters as needed
    }

    private Authentication createAuthenticationToken(String username) {
        // Your custom logic to create a simple authentication token
        // You might not want to use this in a real-world scenario
        // This example is for demonstration purposes only

        return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
    }

    private String createTokenMerch(Authentication authentication, boolean rememberMe) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        if (authentication.getName() != null) {
            authorities += ",ROLE_USER";
        }

        long now = System.currentTimeMillis();
        long validityMillis = rememberMe ? rememberMeDuration : tokenValidityDuration;

        return Jwts
            .builder()
            .setSubject(authentication.getName())
            .claim("authorities", authorities)
            .signWith(SignatureAlgorithm.HS512, "j0n/nx30x7Yk5gZVja1CfMxm5VVMXpd2kBsDrA/R5l6k4e5zeWW5hlffv3gDtW5VVzAnFgMMi1OJkKoTy/qK/Q==")
            .setIssuedAt(new Date(now))
            .setExpiration(new Date(now + validityMillis))
            .compact();
    }

    /**
     * {@code GET /authenticate} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    public String createToken(Authentication authentication, boolean rememberMe) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));

        Instant now = Instant.now();
        Instant validity;
        if (rememberMe) {
            validity = now.plus(this.tokenValidityInSecondsForRememberMe, ChronoUnit.SECONDS);
        } else {
            validity = now.plus(this.tokenValidityInSeconds, ChronoUnit.SECONDS);
        }

        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuedAt(now)
            .expiresAt(validity)
            .subject(authentication.getName())
            .claim(AUTHORITIES_KEY, authorities)
            .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }
}
