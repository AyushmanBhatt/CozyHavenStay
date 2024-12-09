/*
 * package com.hexaware.HotelBooking.Controller;
 * 
 * import com.hexaware.HotelBooking.Entity.LoginRequest; import
 * com.hexaware.HotelBooking.Security.JWTUtil; import
 * com.hexaware.HotelBooking.Security.CustomUserDetailsService; import
 * com.hexaware.HotelBooking.Repository.UserRepository; import
 * com.hexaware.HotelBooking.Entity.User; import
 * org.junit.jupiter.api.BeforeEach; import org.junit.jupiter.api.Test; import
 * org.mockito.*; import org.springframework.http.HttpStatus; import
 * org.springframework.http.ResponseEntity; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.authentication.
 * UsernamePasswordAuthenticationToken; import
 * org.springframework.security.core.Authentication; import
 * org.springframework.web.client.HttpClientErrorException;
 * 
 * import static org.mockito.Mockito.*; import static
 * org.junit.jupiter.api.Assertions.*;
 * 
 * class AuthControllerTest {
 * 
 * @InjectMocks private AuthController authController;
 * 
 * @Mock private AuthenticationManager authenticationManager;
 * 
 * @Mock private JWTUtil jwtUtil;
 * 
 * @Mock private UserRepository userRepository;
 * 
 * @Mock private CustomUserDetailsService userDetailsService;
 * 
 * private LoginRequest loginRequest;
 * 
 * @BeforeEach void setUp() { MockitoAnnotations.openMocks(this); loginRequest =
 * new LoginRequest("testUser", "password123"); }
 * 
 * @Test void testLogin_Success() { Authentication mockAuth = new
 * UsernamePasswordAuthenticationToken("testUser", "password123");
 * when(authenticationManager.authenticate(any(
 * UsernamePasswordAuthenticationToken.class))) .thenReturn(mockAuth);
 * 
 * String token = "mock-jwt-token";
 * when(jwtUtil.generateToken("testUser")).thenReturn(token);
 * 
 * ResponseEntity<String> response = authController.login(loginRequest);
 * 
 * assertEquals(HttpStatus.OK, response.getStatusCode()); assertEquals(token,
 * response.getBody());
 * 
 * verify(authenticationManager).authenticate(any(
 * UsernamePasswordAuthenticationToken.class));
 * verify(jwtUtil).generateToken("testUser"); }
 * 
 * @Test void testLogin_Fail_InvalidCredentials() {
 * when(authenticationManager.authenticate(any(
 * UsernamePasswordAuthenticationToken.class))) .thenThrow(new
 * org.springframework.security.authentication.
 * BadCredentialsException("Invalid credentials"));
 * 
 * ResponseEntity<String> response = authController.login(loginRequest);
 * 
 * assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
 * assertEquals("Invalid credentials", response.getBody());
 * 
 * verify(authenticationManager).authenticate(any(
 * UsernamePasswordAuthenticationToken.class)); } }
 */