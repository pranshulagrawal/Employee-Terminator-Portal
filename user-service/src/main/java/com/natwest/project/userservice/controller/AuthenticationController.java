package com.natwest.project.userservice.controller;

import com.natwest.project.userservice.exception.AuthenticationException;
import com.natwest.project.userservice.model.LoginDTO;
import com.natwest.project.userservice.model.UserDTO;
import com.natwest.project.userservice.service.AuthenticationService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

  @Autowired
  private AuthenticationService authenticationService;

  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
    try {
      Optional<UserDTO> authenticatedUser = authenticationService.authenticate(loginDTO.getEmployee_id(), loginDTO.getPassword(), loginDTO.getUserType());

      if (authenticatedUser.isPresent()) {
        String jwtToken = generateJwtToken(loginDTO);
        response.addCookie(createJwtCookie(jwtToken));
        return ResponseEntity.ok(authenticatedUser.get());
      } else {
        throw new AuthenticationException("Authentication failed");
      }
    } catch (AuthenticationException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }
  }

  private Cookie createJwtCookie(String jwtToken) {
    Cookie cookie = new Cookie("jwtToken", jwtToken);
    cookie.setPath("/");
    cookie.setMaxAge(1800);
    cookie.setHttpOnly(true);
    return cookie;
  }

  private static final String SECRET_KEY = "Exit@#$%Portal";


  private String generateJwtToken(LoginDTO loginDTO) {
    long expirationTimeInMillis = System.currentTimeMillis() + 60 * 60 * 1000;
    return Jwts.builder()
            .setSubject(loginDTO.getEmployee_id()) // You may choose a different subject based on your use case
            .claim("userType", loginDTO.getUserType())
            .setExpiration(new Date(expirationTimeInMillis))
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
  }
}
