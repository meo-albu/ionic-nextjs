import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

export default function Words({data: {slug}}) {
  return (
    <div>
      {slug}
    </div>
    // <IonPage>
    //   <IonHeader>
    //     <IonToolbar>
    //       <IonButtons slot="start">
    //         <IonBackButton defaultHref='/' />
    //       </IonButtons>
    //       <IonTitle>Category</IonTitle>
    //     </IonToolbar>
    //   </IonHeader>
    //   <IonContent fullscreen>
    //     {slug}
    //   </IonContent>
    // </IonPage>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'general'
        }
      },
      {
        params: {
          slug: 'home'
        }
      },
      {
        params: {
          slug: 'health-sport'
        }
      },
      {
        params: {
          slug: 'entertainment'
        }
      },
      {
        params: {
          slug: 'travel'
        }
      },
      {
        params: {
          slug: 'education-work'
        }
      },
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {


  return {
    props: {
      data: {
        slug
      },
    }
  }
}
