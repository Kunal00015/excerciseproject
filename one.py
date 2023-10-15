import cv2
import numpy as np

# Initialize variables
cap = cv2.VideoCapture(0)
counter = 0
detection_threshold = 100
angle_threshold = 160

# Initialize points for angle calculation
last_elbow = None
last_wrist = None

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Flip the frame horizontally for a more intuitive view
    frame = cv2.flip(frame, 1)
    
    # Display text
    cv2.putText(frame, f'Curls: {counter}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    # Convert the frame to grayscale for easier processing
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Load the pre-trained Haarcascades for face and eyes detection
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    for (x, y, w, h) in faces:
        face_roi = gray[y:y+h, x:x+w]
        _, thresholded = cv2.threshold(face_roi, detection_threshold, 255, cv2.THRESH_BINARY)
        contours, _ = cv2.findContours(thresholded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        for contour in contours:
            if cv2.contourArea(contour) > 500:
                x, y, w, h = cv2.boundingRect(contour)
                
                if last_elbow is None:
                    last_elbow = (x + w, y + h)
                else:
                    last_wrist = (x + w, y + h)
                    angle = np.arctan2(last_wrist[1] - last_elbow[1], last_wrist[0] - last_elbow[0]) * 180 / np.pi
                    if angle > angle_threshold:
                        counter += 1
                        last_elbow = None
                        last_wrist = None
    
    cv2.imshow('Biceps Curl Counter', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
