package com.abdellah.taskflow.repository;

import com.abdellah.taskflow.entity.Task;
import com.abdellah.taskflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    List<Task> findByUserAndStatus(User user, Task.Status status);
    List<Task> findByUserAndPriority(User user, Task.Priority priority);
    Optional<Task> findByIdAndUser(Long id, User user);
}
