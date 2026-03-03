package com.abdellah.taskflow.service;

import com.abdellah.taskflow.dto.TaskRequest;
import com.abdellah.taskflow.dto.TaskResponse;
import com.abdellah.taskflow.entity.Task;
import com.abdellah.taskflow.entity.User;
import com.abdellah.taskflow.repository.TaskRepository;
import com.abdellah.taskflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow();
    }

    public List<TaskResponse> getTasks(String status, String priority) {
        User user = currentUser();
        List<Task> tasks;

        if (status != null) {
            tasks = taskRepository.findByUserAndStatus(user, Task.Status.valueOf(status.toUpperCase()));
        } else if (priority != null) {
            tasks = taskRepository.findByUserAndPriority(user, Task.Priority.valueOf(priority.toUpperCase()));
        } else {
            tasks = taskRepository.findByUser(user);
        }

        return tasks.stream().map(TaskResponse::from).collect(Collectors.toList());
    }

    public TaskResponse createTask(TaskRequest req) {
        Task task = Task.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .status(req.getStatus() != null ? req.getStatus() : Task.Status.TODO)
                .priority(req.getPriority() != null ? req.getPriority() : Task.Priority.MEDIUM)
                .dueDate(req.getDueDate())
                .user(currentUser())
                .build();
        return TaskResponse.from(taskRepository.save(task));
    }

    public TaskResponse updateTask(Long id, TaskRequest req) {
        Task task = taskRepository.findByIdAndUser(id, currentUser())
                .orElseThrow(() -> new RuntimeException("Task not found"));
        if (req.getTitle() != null) task.setTitle(req.getTitle());
        if (req.getDescription() != null) task.setDescription(req.getDescription());
        if (req.getStatus() != null) task.setStatus(req.getStatus());
        if (req.getPriority() != null) task.setPriority(req.getPriority());
        if (req.getDueDate() != null) task.setDueDate(req.getDueDate());
        return TaskResponse.from(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findByIdAndUser(id, currentUser())
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }
}
