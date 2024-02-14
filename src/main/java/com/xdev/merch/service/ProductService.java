package com.xdev.merch.service;

import com.xdev.merch.entities.Products;
import com.xdev.merch.repository.ProductsRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProductService {

    @Autowired
    ProductsRepository productsRepository;

    public List<Products> getAllProductsByUserId(Long userId) {
        return productsRepository.findAllByUserId(userId);
    }

    public List<Products> findAll() {
        return productsRepository.findAll();
    }
}
