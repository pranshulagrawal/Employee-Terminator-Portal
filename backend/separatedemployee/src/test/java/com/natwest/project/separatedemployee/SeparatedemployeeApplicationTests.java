package com.natwest.project.separatedemployee;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.natwest.project.separatedemployee.controller.SeparatedEmployeeController;
import com.natwest.project.separatedemployee.model.DepartmentClearance;
import com.natwest.project.separatedemployee.model.SeparatedEmployee;
import com.natwest.project.separatedemployee.service.SeparatedEmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
class SeparatedemployeeApplicationTests {

	@InjectMocks
	private SeparatedEmployeeController controller;

	@Mock
	private SeparatedEmployeeService service;

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testUpdateDepartmentClearances() {

		String employeeId = "123";
		List<DepartmentClearance> updatedClearances = new ArrayList<>();


		when(service.updateDepartmentClearances(employeeId, updatedClearances))
				.thenReturn(new ResponseEntity<>(HttpStatus.OK));


		ResponseEntity<SeparatedEmployee> response = controller.updateDepartmentClearances(employeeId, updatedClearances);


		assertEquals(HttpStatus.OK, response.getStatusCode());


		verify(service, times(1)).updateDepartmentClearances(employeeId, updatedClearances);
	}

	@Test
	public void testFileSeparation() {

		SeparatedEmployee employee = new SeparatedEmployee();


		when(service.fileSeparation(employee)).thenReturn(employee);


		SeparatedEmployee result = controller.fileSeparation(employee);


		assertEquals(employee, result);


		verify(service, times(1)).fileSeparation(employee);
	}

	@Test
	public void testGetAllSeparatedEmployees() {

		List<SeparatedEmployee> employees = new ArrayList<>();


		when(service.getAllSeparatedEmployees()).thenReturn(employees);


		List<SeparatedEmployee> result = controller.getAllSeparatedEmployees();


		assertEquals(employees, result);

		verify(service, times(1)).getAllSeparatedEmployees();
	}


}


