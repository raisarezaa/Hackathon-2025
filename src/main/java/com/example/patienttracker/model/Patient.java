// model/Patient.java
package com.example.patienttracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Patient name is required")
    private String name;

    private int age;
    private String condition;

    // ✅ link to caregiver
    @ManyToOne
    @JoinColumn(name = "caregiver_id")
    private User caregiver;

    // getters & setters
}
