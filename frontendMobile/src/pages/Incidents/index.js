import React, { useEffect, useState } from 'react'
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  function navigationDetail(incident) {
    navigation.navigate('Detail', { incident })
  }

  async function loadIncidents() {
    if (loading) {
      return
    }

    if (total > 0 && incidents.length === total) {
      return
    }

    setLoading(true)

    try {
      const res = await api.get('incidents', { params: { page } })
      setIncidents([...incidents, ...res.data])
      setTotal(res.headers['x-total-count'])
      setPage(page + 1)
      setLoading(false)
    } catch (error) {
      alert('Error')
      setLoading(false)
    }
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} />
          <Text style={styles.headerText}>
            Total de
            <Text style={styles.headerTextBold}> {total} casos.</Text>
          </Text>
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>
          Escolha um dos casos abaixo e salve o dia.
        </Text>

        <FlatList
          style={styles.incidentList}
          keyExtractor={item => String(item.id)}
          data={incidents}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: incident }) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{incident.name}</Text>
              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>
              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(incident.value)}
              </Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigationDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Icon name="arrow-right" size={16} color="#E02041" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
