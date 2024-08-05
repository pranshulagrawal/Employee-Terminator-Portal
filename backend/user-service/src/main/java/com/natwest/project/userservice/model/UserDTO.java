package com.natwest.project.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
  private String employee_id;
  private String manager_id;
  private String hr_id;
  private String name;
  private String email_id;
  private String role;
  private boolean active;
}
