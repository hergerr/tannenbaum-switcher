import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Title } from '../components/Title';
import { View, ToastAndroid, StyleSheet, Switch, ScrollView, RefreshControl } from 'react-native';
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
  temp: {
    alignItems: "center",
    justifyContent: "center",
    height: 150
  },
  switch: {
    marginTop: 80,
    transform: [{ scaleX: 2 }, { scaleY: 2 }]
  }
})

export const MainScreen = () => {
  // undefined on the beginnig
  const [isEnabled, setIsEnabled] = useState();
  const [switchDisabled, setswitchDisabled] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000)
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${URL}/status`);
      setswitchDisabled(false)
      setIsEnabled(result.data.on)
    } catch (error) {
      ToastAndroid.show("Błąd sieci. Połącz się z domowym WiFi i odśwież aplikację", ToastAndroid.SHORT);
      setswitchDisabled(true)
    }
  };


  useEffect(() => {
    if (refreshing === true)
      fetchData();
  }, [refreshing])

  useEffect(() => {
    fetchData()
  }, [])

  const toggleSwitch = async () => {
    const fetchData = async () => {
      try {
        await axios.get(`${URL}/toggle`);
        setIsEnabled(!isEnabled)
      }
      catch (err) {
        ToastAndroid.show("Nie udało się przełączyć lampek", ToastAndroid.SHORT);
      }
    }
    fetchData();
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Title style={styles.title} />
        <View style={styles.temp}>
          <Switch
            disabled={switchDisabled}
            style={styles.switch}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </ScrollView>
    </View>
  )
}