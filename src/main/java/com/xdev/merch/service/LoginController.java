package com.xdev.merch.service;

// LoginController.java
import com.xdev.merch.domain.Users;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/login")
public class LoginController {

    private final UsersService usersService;

    @Autowired
    public LoginController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping
    public String showLoginForm() {
        return "login"; // Assuming your login HTML file is named "login.html"
    }
    //    @PostMapping
    //    public String login(String username, String password, Model model) {
    //        Optional<Users> user = usersService.findByUsernameAndPassword(username, password);

    //        if (user != null) {
    //            // Add login success logic, e.g., redirect to a dashboard
    //            return "redirect:/dashboard";
    //        } else {
    //            model.addAttribute("error", "Invalid username or password");
    //            return "login"; // Return to login page with an error message
    //        }
    //    }
}
