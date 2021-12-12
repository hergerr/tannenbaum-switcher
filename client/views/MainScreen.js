import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Title } from '../components/Title';
import { View, StyleSheet, Switch } from 'react-native';
import { URL } from '../utils/config';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    // flex: 1
  },
  switch: {
    marginTop: 80,
    transform: [{ scaleX: 2 }, { scaleY: 2 }]
  }
})

export const MainScreen = () => {
  // undefined on the beginnig
  const [isEnabled, setIsEnabled] = useState();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axios.get(`${URL}/status`);
        setIsEnabled(result.data.on)
      }
      fetchData();
    }
    catch (err) {
      console.log(err)
    }
  }, [])
  const toggleSwitch = async () => {
    try {
      const fetchData = async () => {
        await axios.get(`${URL}/toggle`);
        setIsEnabled(!isEnabled)
      }
      fetchData();
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title} />
      <Switch
        style={styles.switch}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}