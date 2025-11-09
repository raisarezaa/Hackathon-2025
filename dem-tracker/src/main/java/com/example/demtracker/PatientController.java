package com.example.demtracker;


import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/patients")
public class PatientController {

    private Map<String, PatientLocation> patientLocations = new HashMap<>();

    // GET patient location
    @GetMapping("/{id}/location")
    public PatientLocation getLocation(@PathVariable String id) {
        // return location if exists, else default 0,0
        return patientLocations.getOrDefault(id, new PatientLocation(0.0, 0.0));
    }

    // POST update patient location
    @PostMapping("/{id}/location")
    public Map<String, String> updateLocation(@PathVariable String id, @RequestBody PatientLocation location) {
        patientLocations.put(id, location);
        return Map.of("status", "updated");
    }

    @PostMapping("/{id}/checkSafeZone")
    public Map<String, Boolean> checkSafeZone(@PathVariable String id, @RequestBody PatientLocation destination) {

        PatientLocation home = this.getLocation(id);

        double distance = calculateDistance(home, destination);
        double maxRadius = 300;

        boolean safeZone = distance <= maxRadius;

        return Map.of("Inside SafeZone", safeZone);
    }

    private double calculateDistance(PatientLocation loc1, PatientLocation loc2) {
        double R = 6371000; // Earth radius in meters
        double lat1 = Math.toRadians(loc1.getLatitude());
        double lat2 = Math.toRadians(loc2.getLatitude());
        double deltaLat = Math.toRadians(loc2.getLatitude() - loc1.getLatitude());
        double deltaLon = Math.toRadians(loc2.getLongitude() - loc1.getLongitude());

        double a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c; // distance in meters
    }








    }


