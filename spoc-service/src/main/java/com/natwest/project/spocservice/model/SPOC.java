package com.natwest.project.spocservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "SPOC")
public class SPOC {
    private String id;
    private String name;
    private String Department;
    private Long contactno;
    private String email;
}
