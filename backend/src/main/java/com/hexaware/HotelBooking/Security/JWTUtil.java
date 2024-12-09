package com.hexaware.HotelBooking.Security;

import java.util.Date;
import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
    private static final String SECRET_KEY = "absgdhjagbdbaudshfgshdjdgfjhfgsdgfdsgjgfudsgf";
    private static final int TOKEN_VALIDITY = 5 * 60 * 60;

    // Generate the token
    public String generateToken(String username) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract the username from the token
    public String extractUserName(String token) {
        return getClaims(token).getSubject();
    }

    // Check if the token is valid
    public Boolean isTokenValid(String token, String username) {
        String extractedUsername = extractUserName(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // Extract the claims from the token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
