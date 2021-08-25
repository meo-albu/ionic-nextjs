import React from 'react'
import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonLoading, IonMenuButton, IonPage, IonRouterOutlet, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import { Heading } from '@driven-crm/lib'
import { gql, useQuery } from '@apollo/client'

const Query = gql`
  query Query {
    getCategories {
      title {
        english
        romanian
      }
      slug
    }
  }
`
interface IQuery {
  getCategories: {
    title: {
      english: string
      romanian: string
    }
    slug: string
  }[]
}

export default function Home() {

  const { data, loading } = useQuery<IQuery>(Query)

  if(loading) return <IonLoading isOpen={loading} />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonSelect
              interface='popover'
              onIonChange={(e) => console.log(e.detail.value)}
            >
              <IonSelectOption value="romanian">RO</IonSelectOption>
              <IonSelectOption value="english">EN</IonSelectOption>
            </IonSelect>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='shadow-lg h-full flex flex-col overflow-y-scroll'>
          <div className='p-6 text-center text-gray-900'>
            <Heading level='3'>Learn German Language</Heading>
          </div>
          <div className='bg-primary text-white py-6 px-4 space-y-4 flex-1'>
            <IonList style={{background: 'none'}}>
              <IonListHeader>
                <IonLabel><span className='text-white'>Choose a category.</span></IonLabel>
              </IonListHeader>
              {data?.getCategories.map(cat => (
                <IonItem
                  key={cat.slug}
                  routerLink={`/category/${cat.slug}`}
                >
                  <IonLabel className='p-6'>
                    {cat.title.english}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
