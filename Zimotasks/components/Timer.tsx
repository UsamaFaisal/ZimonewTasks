import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Set your target date and time here
  const targetDate = new Date('2023-9-31T23:59:59').getTime();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        // Timer has expired, you can handle this case here
        clearInterval(intervalId);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timerValues}>
        <View style={styles.timerUnit}>
          <Text style={styles.timertext}>{`${timeRemaining.days}`}</Text>
          <Text style={styles.timertext1}>DAYS</Text>
        </View>
        <View style={styles.timerUnit}>
          <Text style={styles.timertext}>{`${timeRemaining.hours}`}</Text>
          <Text style={styles.timertext1}>HOURS</Text>
        </View>
        <View style={styles.timerUnit}>
          <Text style={styles.timertext}>{`${timeRemaining.minutes}`}</Text>
          <Text style={styles.timertext1}>MINUTES</Text>
        </View>
        <View style={styles.timerUnit}>
          <Text style={styles.timertext}>{`${timeRemaining.seconds}`}</Text>
          <Text style={styles.timertext1}>SECONDS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginBottom: 20,
  },
  timerValues: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjust the spacing between units
  },
  timerUnit: {
    alignItems: 'center', // Center text within each unit
  },
  timertext: {
    color: '#fff',
    fontFamily: 'Times New Roman',
    fontSize: 55,
    margin:5,
  },
  timertext1: {
    color: '#fff',
    fontSize: 15,
    margin:5,
  },
});

export default Timer;
