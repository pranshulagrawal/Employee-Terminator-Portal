package com.natwest.project.userservice;
import org.springframework.boot.test.context.SpringBootTest;

import com.natwest.project.userservice.controller.HrController;
import com.natwest.project.userservice.controller.ManagerController;
import com.natwest.project.userservice.model.HR;
import com.natwest.project.userservice.model.Manager;
import com.natwest.project.userservice.service.HrService;
import com.natwest.project.userservice.service.ManagerService;
import com.natwest.project.userservice.controller.EmployeeController;
import com.natwest.project.userservice.model.Employee;
import com.natwest.project.userservice.service.EmployeeService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class UserServiceApplicationTests {

	@InjectMocks
	private ManagerController managerController;

	@Mock
	private ManagerService managerService;

	@InjectMocks
	private HrController hrController;

	@Mock
	private HrService hrService;

	@InjectMocks
	private EmployeeController employeeController;

	@Mock
	private EmployeeService employeeService;

	@Test
	void contextLoads() {
	}

	@Test
	void testCreateManager() {

		Manager managerToCreate = new Manager();
		when(managerService.createManager(managerToCreate)).thenReturn(managerToCreate);
		Manager createdManager = managerController.createManager(managerToCreate);
		assertNotNull(createdManager);
	}

	@Test
	void testUpdateActiveStatus() {

		String managerId = "123";
		Manager expectedUpdatedManager = new Manager();
		expectedUpdatedManager.setActive(false);

		when(managerService.updateActiveStatus(managerId)).thenReturn(expectedUpdatedManager);
		Manager updatedManager = managerController.updateActiveStatus(managerId);
		assertNotNull(updatedManager);
		assertFalse(updatedManager.isActive());
	}

	@Test
	void testChangePassword() {

		Map<String, String> passwordChangeRequest = new HashMap<>();
		passwordChangeRequest.put("employee_id", "123");
		passwordChangeRequest.put("oldPassword", "old123");
		passwordChangeRequest.put("newPassword", "new456");

		when(managerService.changePassword("123", "old123", "new456")).thenReturn(true);

		ResponseEntity<String> response = managerController.changePassword(passwordChangeRequest);
		assertNotNull(response);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Password changed successfully", response.getBody());
	}

	@Test
	void testGetManagerById() {

		String managerId = "123";
		Manager expectedManager = new Manager();


		when(managerService.getManagerById(managerId)).thenReturn(expectedManager);

		ResponseEntity<Manager> response = managerController.getManagerById(managerId);

		assertNotNull(response);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(expectedManager, response.getBody());
	}

	@Test
	void testCreateHr() {

		HR hrToCreate = new HR();

		when(hrService.createHr(hrToCreate)).thenReturn(hrToCreate);

		HR createdHr = hrController.createHr(hrToCreate);

		assertNotNull(createdHr);
	}



	@Test
	void testChangeHrPassword() {

		Map<String, String> passwordChangeRequest = new HashMap<>();
		passwordChangeRequest.put("employee_id", "789");
		passwordChangeRequest.put("oldPassword", "old456");
		passwordChangeRequest.put("newPassword", "new789");

		when(hrService.changePassword("789", "old456", "new789")).thenReturn(true);

		ResponseEntity<String> response = hrController.changePassword(passwordChangeRequest);
		assertNotNull(response);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Password changed successfully", response.getBody());
	}

	@Test
	void testGetHrById() {
		String hrId = "789";
		HR expectedHr = new HR();

		when(hrService.getHrById(hrId)).thenReturn(expectedHr);

		ResponseEntity<HR> response = hrController.getHrById(hrId);

		assertNotNull(response);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(expectedHr, response.getBody());
	}



	@Test
	void testCreateEmployee() {
		Employee employeeToCreate = new Employee();
		when(employeeService.createEmployee(employeeToCreate)).thenReturn(employeeToCreate);
		Employee createdEmployee = employeeController.createEmployee(employeeToCreate);
		assertNotNull(createdEmployee);
	}

	@Test
	void testUpdateEmployeeActiveStatus() {
		String employeeId = "456";
		Employee expectedUpdatedEmployee = new Employee();
		expectedUpdatedEmployee.setActive(false);

		when(employeeService.updateActiveStatus(employeeId)).thenReturn(expectedUpdatedEmployee);

		Employee updatedEmployee = employeeController.updateActiveStatus(employeeId);
		assertNotNull(updatedEmployee);
		assertFalse(updatedEmployee.isActive());
	}

	@Test
	void testChangeEmployeePassword() {
		Map<String, String> passwordChangeRequest = new HashMap<>();
		passwordChangeRequest.put("employee_id", "789");
		passwordChangeRequest.put("oldPassword", "old456");
		passwordChangeRequest.put("newPassword", "new789");

		when(employeeService.changePassword("789", "old456", "new789")).thenReturn(true);

		ResponseEntity<String> response = employeeController.changePassword(passwordChangeRequest);
		assertNotNull(response);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Password changed successfully", response.getBody());
	}


}
