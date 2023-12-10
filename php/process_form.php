<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $feedback = isset($_POST['feedback']) ? $_POST['feedback'] : '';
    $rating = isset($_POST['rating']) ? $_POST['rating'] : '';

    // Specify your email address
    $to = 'borisvavrik@borisvavrik.co.uk'; // Replace with your actual email address
    $subject = 'New Contact Form Submission';

    // Prepare the email body
    $message = "Name: $name\r\n";
    $message .= "Email: $email\r\n";
    $message .= "Phone: $phone\r\n";
    $message .= "Rating: $rating\r\n";
    $message .= "Feedback:\r\n$feedback";

    // Make sure each line does not exceed 70 characters
    $message = wordwrap($message, 70, "\r\n");

    // Prepare headers
    $headers = 'From: webmaster@yourdomain.com' . "\r\n"; // Replace with a valid email address
    $headers .= 'Reply-To: webmaster@yourdomain.com' . "\r\n"; // Replace with a valid email address
    $headers .= 'X-Mailer: PHP/' . phpversion();

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Mail Sent Successfully!";
    } else {
        echo "Mail Sending Failed.";
    }
} else {
    echo "No form data received.";
}
?>
