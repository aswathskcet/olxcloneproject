package com.example.demo.Service;




import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.FavoritesEntity;
import com.example.demo.Entity.ForgotPasswordEntity;
import com.example.demo.Entity.SellEntity;
import com.example.demo.Entity.UpdatePasswordEntity;
import com.example.demo.Entity.UserEntity;
import com.example.demo.Repo.FavoritesRepo;
import com.example.demo.Repo.ForgotPasswordRepo;
import com.example.demo.Repo.SellRepo;
import com.example.demo.Repo.UpdatePasswordRepo;
import com.example.demo.Repo.UserRepo;

@Service
public class UserService {

	 @Autowired
	    private UserRepo userRepository;

	 @Autowired
	    private SellRepo sellRepo;
	 
	 @Autowired
	    private FavoritesRepo favoritesRepo;
	 
	 @Autowired
	    private ForgotPasswordRepo forgotPasswordRepo;
	 
	 @Autowired
	    private UpdatePasswordRepo updatePasswordRepo;
    

    
	    public UserEntity saveUser(UserEntity user) {
	        return userRepository.save(user);
	    }

	    public SellEntity saveSell(SellEntity sellEntity) {
	        // Assuming that the username is already set in the SellEntity
	        return sellRepo.save(sellEntity);
	    }

	    public boolean login(String username, String password) {
	        UserEntity user = userRepository.findByUsername(username);
	        return user != null && user.getPassword().equals(password);
	    }
	    
	    public List<SellEntity> getAllSellEntities() {
	        return sellRepo.findAll();
	    }

	    public FavoritesEntity addFavorite(Long userId, Long itemId) {
	        FavoritesEntity favorite = new FavoritesEntity(userId, itemId);
	        return favoritesRepo.save(favorite);
	    }
	   

	    public void removeFavorite(Long userId, Long itemId) {
	        favoritesRepo.deleteByUserIdAndItemId(userId, itemId);
	    }
	    
	    public boolean updatePassword(ForgotPasswordEntity request) {
	        // Find the user by username and email
	        UserEntity user = forgotPasswordRepo.findByUsernameAndEmail(request.getUsername(), request.getEmail());

	        if (user != null) {
	            // Update the password directly
	            user.setPassword(request.getNewPassword());
	            forgotPasswordRepo.save(user); // Save the updated user entity
	            return true;
	        }

	        // Return false if the user was not found
	        return false;
	    }
	    
	    public boolean updatePassword(UpdatePasswordEntity request) {
	        // Find the user by username
	        UserEntity user = userRepository.findByUsername(request.getUsername());
	        if (user != null) {
	            // Check if the old password is correct
	            if (user.getPassword().equals(request.getOldPassword())) {
	                // Check if new password and confirm password match
	                if (request.getNewPassword().equals(request.getConfirmPassword())) {
	                    // Update the password
	                    user.setPassword(request.getNewPassword());
	                    userRepository.save(user);
	                    return true;
	                }
	            }
	        }
	        return false;
	    }

	    public List<SellEntity> searchProducts(String query) {
	        return sellRepo.searchByTitle(query);
	    }
	    
	    public boolean deleteUserByUsernameAndPassword(String username, String password) {
	        return userRepository.findByUsernameAndPassword(username, password).map(user -> {
	            userRepository.delete(user);
	            return true;
	        }).orElse(false);
	    }

	   
}
