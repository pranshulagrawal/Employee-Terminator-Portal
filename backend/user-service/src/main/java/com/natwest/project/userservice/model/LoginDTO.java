package com.natwest.project.userservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDTO {
  private String employee_id;
  private String password;
  private String userType;
}
