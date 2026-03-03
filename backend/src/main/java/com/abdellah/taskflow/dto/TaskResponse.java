package com.abdellah.taskflow.dto;

import com.abdellah.taskflow.entity.Task;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private Task.Status status;
    private Task.Priority priority;
    private LocalDate dueDate;
    private LocalDateTime createdAt;

    public static TaskResponse from(Task task) {
        TaskResponse r = new TaskResponse();
        r.setId(task.getId());
        r.setTitle(task.getTitle());
        r.setDescription(task.getDescription());
        r.setStatus(task.getStatus());
        r.setPriority(task.getPriority());
        r.setDueDate(task.getDueDate());
        r.setCreatedAt(task.getCreatedAt());
        return r;
    }
}
