package com.example.demo.Controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.FavoritesEntity;
import com.example.demo.Entity.ForgotPasswordEntity;
import com.example.demo.Entity.SellEntity;
import com.example.demo.Entity.UpdatePasswordEntity;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Repo.SellRepo;
import com.example.demo.Service.UserService;








@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

	@Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserEntity> signup(@RequestBody UserEntity user) {
        UserEntity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/submit")
    public SellEntity submitSellDetails(@RequestBody SellEntity sellEntity) {

        return userService.saveSell(sellEntity);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam String username,
            @RequestParam String password) {
        boolean isAuthenticated = userService.login(username, password);
        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @GetMapping("/all")
    public List<SellEntity> getAllSellEntities() {
        return userService.getAllSellEntities();
    }
    
    @Autowired
    private SellRepo productRepository;
    
    @DeleteMapping("/remove-product/{id}")
    public ResponseEntity<String> removeProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("Product removed successfully");
    }
    
    @PostMapping("/{userId}/favorites/{itemId}")
    public ResponseEntity<FavoritesEntity> addFavorite(@PathVariable Long userId, @PathVariable Long itemId) {
        FavoritesEntity favorite = userService.addFavorite(userId, itemId);
        return ResponseEntity.ok(favorite);
    }
  


    @DeleteMapping("/{userId}/favorites/{itemId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long userId, @PathVariable Long itemId) {
        userService.removeFavorite(userId, itemId);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ForgotPasswordEntity request) {
        boolean success = userService.updatePassword(request);
        if (success) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Invalid username or email.");
        }
    }
    
    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordEntity request) {
        boolean result = userService.updatePassword(request);
        if (result) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update password. Check your old password or ensure the new passwords are correct.");
        }
    }
    
    @GetMapping("/search")
    public List<SellEntity> searchProducts(@RequestParam String query) {
        return userService.searchProducts(query);
    }
     
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String username, @RequestParam String password) {
        boolean isDeleted = userService.deleteUserByUsernameAndPassword(username, password);
        if (isDeleted) {
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("User not found or incorrect credentials.");
        }
    }
      

     
}
