package com.natwest.training.sd;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;


import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EurekaServerApplicationTests {

	@Value("${server.port}")
	private int serverPort;

	@Autowired
	private Environment environment;

	@Test
	void contextLoads() {
		assertNotNull(serverPort);
	}

	@Test
	void testServerPort() {
		assertEquals(8761, serverPort);
	}


	@Test
	void testFetchRegistryProperty() {
		assertFalse(environment.getProperty("eureka.client.fetch-registry", Boolean.class, true));
	}

	@Test
	void testRegisterWithEurekaProperty() {
		assertFalse(environment.getProperty("eureka.client.register-with-eureka", Boolean.class, true));
	}



	@Test
	void testEurekaServiceUrl() {
		String expectedUrl = "http://localhost:8761/eureka";
		assertEquals(expectedUrl, environment.getProperty("eureka.client.service-url.defaultZone"));
	}


}