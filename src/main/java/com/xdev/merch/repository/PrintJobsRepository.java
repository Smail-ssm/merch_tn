package com.xdev.merch.repository;

import com.xdev.merch.entities.PrintJobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrintJobsRepository extends JpaRepository<PrintJobs, Long> {}
