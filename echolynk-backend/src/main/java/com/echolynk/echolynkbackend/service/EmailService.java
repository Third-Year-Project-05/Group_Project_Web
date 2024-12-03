package com.echolynk.echolynkbackend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;


public void sendInvitationEmail(String toEmail, String roomId) throws MessagingException {
    MimeMessage mimeMessage = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

    String roomUrl = "https://echolynk-cf3ca.web.app/user-video-chat/room/" + roomId; // Replace with your actual room URL
    String htmlContent = "<div style='font-family: Arial, sans-serif; color: #333;'>"
            + "<h2 style='color: #2D89EF;'>You’re Invited!</h2>"
            + "<p>Hello,</p>"
            + "<p><b>Echolynk</b> is excited to connect you with others in meaningful ways. You’ve been invited to join a room specially created for you:</p>"
            + "<p style='font-size: 16px; color: #555;'>Room ID: <b>" + roomId + "</b></p>"
            + "<p>To join, simply click the link below:</p>"
            + "<p><a href=\"" + roomUrl + "\" style='color: #2D89EF; text-decoration: none; font-weight: bold;'>Join the Room</a></p>"
            + "<p>We’re here to bridge communication gaps and make interactions seamless. If you have any questions, feel free to reach out to us at <a href='mailto:support@echolynk.com'>support@echolynk.com</a>.</p>"
            + "<p>Best regards,</p>"
            + "<p><b>The Echolynk Team</b></p>"
            + "<p style='font-size: 12px; color: #999;'>This is an automated email. Please do not reply directly to this message.</p>"
            + "</div>";

    helper.setTo(toEmail);
    helper.setSubject("Echolynk: Your Invitation Awaits!");
    helper.setText(htmlContent, true); // true indicates the content is HTML

    mailSender.send(mimeMessage);
}

}
