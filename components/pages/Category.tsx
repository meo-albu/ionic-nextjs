import { gql, useQuery } from '@apollo/client'
import { Transition } from '@headlessui/react'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

const Query = gql`
  query Query($slug: String!) {
    getWords(slug: $slug) {
      german
      id
      translations {
        english
        romanian
      }
    }
  }
`

interface Word {
  german: string
  id: string
  translations: {
    english: string
    romanian: string
  }
}

interface IQuery {
  getWords: Word[]
}

const colors = [
  'bg-red-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-indigo-300',
  'bg-blue-300',
]

export default function Category({slug}) {
  const { data, loading } = useQuery<IQuery>(Query, {variables: {slug}})

  const [active, setActive] = React.useState(0)
  const [flipped, setFlipped] = React.useState(false)
  const [direction, setDirection] = React.useState<'left' | 'right'>('right')

  const [bg, setBg] = React.useState(colors[Math.floor(Math.random() * colors.length)])

  React.useEffect(() => {
    setBg(colors[Math.floor(Math.random() * colors.length)])
  }, [active])

  const currentLang = 'english'

  if(loading) return <div>loading...</div>

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className='h-screen grid place-content-center bg-primary overflow-hidden'>
      {
        data.getWords.map((word: Word, index: number) => {
          return (
            <div key={word.id} className='w-80 relative bg-red-500'>
              {
                  <Transition
                    show={index === active}
                    enter="transition-all duration-300"
                    enterFrom={`opacity-0 ${direction === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-300"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo={`opacity-0 ${direction === 'left' ? 'translate-x-full' : '-translate-x-full'}`}
                    className='absolute bottom-0'
                  >
                    <div style={{perspective: '800px'}} className="container w-80 h-48 relative" onClick={() => setFlipped(!flipped)}>
                      <div
                        style={{
                          transform: flipped ? 'rotateY(180deg)' : '',
                          transformStyle: flipped ? 'preserve-3d' : 'preserve-3d'
                        }}
                        className="card w-full h-full transition-transform duration-700 absolute shadow-2xl cursor-pointer"
                      >
                        <div style={{backfaceVisibility: 'hidden'}} className={`front absolute h-full w-full ${bg} rounded-md grid place-content-center`}>{word.german}</div>
                        <div style={{transform: 'rotateY(180deg)', backfaceVisibility: 'hidden'}} className={`back absolute h-full w-full ${bg} rounded-md grid place-content-center p-6 text-center`}>
                          {
                            word.translations[currentLang]
                          }
                        </div>
                      </div>
                    </div>
                  </Transition>
              }
            </div>
          )
        })
      }
      <div className='w-full flex justify-between mt-10'>
        <button 
          className='px-6 py-2 bg-white rounded-md disabled:bg-opacity-30 disabled:cursor-not-allowed'
          onClick={() => {
            setDirection('left')
            setFlipped(false)
            setActive(prev => prev - 1)
          }}
          disabled={active === 0}
        >
          prev
        </button>
        <button
          className='px-6 py-2 bg-white rounded-md disabled:bg-opacity-30 disabled:cursor-not-allowed'
          onClick={() => {
            setDirection('right')
            setFlipped(false)
            setActive(prev => prev + 1)
          }}
          disabled={active === data?.getWords.length}
        >
          next
        </button>
      </div>
    </div>
      </IonContent>
    </IonPage>
  )
}
