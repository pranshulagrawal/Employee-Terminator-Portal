package com.natwest.project.separatedemployee.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DepartmentClearance {
    @Id
    private String id;
    private String department;
    private String status;
    private String comment;
}
