package com.chandan.kalyndrApplication.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cal_event_details")
public class KalyndrEventDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;

    @Column(name = "event_date")
    private String eventDate;

    private String time;
    private String category;
    private String userId;
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getEventDate() {
        return eventDate;
    }
    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getUserId() {
        return userId;
    }
    public void setUserID(String userId) {
        this.userId = userId;
    }

    // Getters and Setters (same as current)
    
}
