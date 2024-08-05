package com.natwest.project.separatedemployee.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "SeparatedEmployee")
public class SeparatedEmployee {
    @Id
    private String employee_id;
    private String manager_id;
    private String hr_id;
    private String name;
    private String email_id;
    private boolean terminated;
    private String department;
    private String lastWorkDay;
    private String reason;
    private String remarks;
    private List<DepartmentClearance> departmentClearancesList;

}
