package com.natwest.project.userservice.service;

import com.natwest.project.userservice.exception.AuthenticationException;
import com.natwest.project.userservice.model.Employee;
import com.natwest.project.userservice.model.HR;
import com.natwest.project.userservice.model.Manager;
import com.natwest.project.userservice.model.UserDTO;
import com.natwest.project.userservice.repository.EmployeeRepository;
import com.natwest.project.userservice.repository.HrRepository;
import com.natwest.project.userservice.repository.ManagerRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

  @Autowired
  private HrRepository hrRepository;

  @Autowired
  private ManagerRepository managerRepository;

  @Autowired
  private EmployeeRepository employeeRepository;


//  public Optional<UserDTO> authenticate(String employee_id, String password, String userType) {
//    UserDTO userDTO = null;
//
//    if (userType.equals("HR")) {
//      Optional<HR> user = hrRepository.findById(employee_id);
//      if (user.isPresent() && user.get().getPassword().equals(password)) {
//        userDTO = mapHRtoUserDTO(user.get());
//      }
//    } else if (userType.equals("Manager")) {
//      Optional<Manager> user = managerRepository.findById(employee_id);
//      if (user.isPresent() && user.get().getPassword().equals(password)) {
//        userDTO = mapManagertoUserDTO(user.get());
//      }
//    } else if (userType.equals("Employee")) {
//      Optional<Employee> user = employeeRepository.findById(employee_id);
//      if (user.isPresent() && user.get().getPassword().equals(password)) {
//        userDTO = mapEmployeetoUserDTO(user.get());
//      }
//    }
//
//    if (userDTO != null) {
//      return Optional.of(userDTO);
//    }
//
//
//    throw new AuthenticationException("Authentication failed");
//  }


  public Optional<UserDTO> authenticate(String employee_id, String password) {
    UserDTO userDTO = null;

    Optional<HR> hrUser = hrRepository.findById(employee_id);
    Optional<Manager> managerUser = managerRepository.findById(employee_id);
    Optional<Employee> employeeUser = employeeRepository.findById(employee_id);

    if (hrUser.isPresent() && hrUser.get().getPassword().equals(password)) {
      userDTO = mapHRtoUserDTO(hrUser.get());
    } else if (managerUser.isPresent() && managerUser.get().getPassword().equals(password)) {
      userDTO = mapManagertoUserDTO(managerUser.get());
    } else if (employeeUser.isPresent() && employeeUser.get().getPassword().equals(password)) {
      userDTO = mapEmployeetoUserDTO(employeeUser.get());
    }

    if (userDTO != null) {
      return Optional.of(userDTO);
    }

    throw new AuthenticationException("Authentication failed");
  }

  private UserDTO mapToUserDTO(User user) {
    if (user instanceof HR) {
      return mapHRtoUserDTO((HR) user);
    } else if (user instanceof Manager) {
      return mapManagertoUserDTO((Manager) user);
    } else if (user instanceof Employee) {
      return mapEmployeetoUserDTO((Employee) user);
    }

    // Handle the case if the user type is not recognized
    throw new AuthenticationException("Invalid user type");
  }
  private UserDTO mapHRtoUserDTO(HR hr) {
    UserDTO userDTO = new UserDTO();
    userDTO.setEmployee_id(hr.getEmployee_id());
    userDTO.setName(hr.getName());
    userDTO.setEmail_id(hr.getEmail_id());
    userDTO.setRole(hr.getRole());
    userDTO.setActive(hr.isActive());
    return userDTO;
  }

  private UserDTO mapManagertoUserDTO(Manager manager) {
    UserDTO userDTO = new UserDTO();
    userDTO.setEmployee_id(manager.getEmployee_id());
    userDTO.setHr_id(manager.getHr_id());
    userDTO.setName(manager.getName());
    userDTO.setEmail_id(manager.getEmail_id());
    userDTO.setRole(manager.getRole());
    userDTO.setActive(manager.isActive());
    return userDTO;
  }

  private UserDTO mapEmployeetoUserDTO(Employee employee) {
    UserDTO userDTO = new UserDTO();
    userDTO.setEmployee_id(employee.getEmployee_id());
    userDTO.setManager_id(employee.getManager_id());
    userDTO.setHr_id(employee.getHr_id());
    userDTO.setName(employee.getName());
    userDTO.setEmail_id(employee.getEmail_id());
    userDTO.setRole(employee.getRole());
    userDTO.setActive(employee.isActive());
    return userDTO;
  }

}
