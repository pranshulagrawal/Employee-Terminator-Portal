package com.natwest.project.userservice.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "HR")
public class HR {
    @Id
    private String employee_id;
    private String name;
    private String email_id;
    private String password;
    private String role;
    @Getter
    private boolean active;

    public void setActive(boolean active) {
        this.active = active;
    }
}
