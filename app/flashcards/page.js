'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { doc, getDoc, collection, setDoc  } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcardSets, setFlashcardSets] = useState([])
    const [error, setError] = useState(null)
    const router = useRouter()
  
    // ... (rest of the component)
    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const collections = docSnap.data().flashcardSets || [];
                setFlashcardSets(collections);
            } else {
                await setDoc(docRef, { flashcardSets: [] });
            }
        } catch (error) {
            setError('Failed to fetch flashcards. Please try again later.')
            console.error("Failed to fetch flashcards:", error);
            // Optionally set an error state and display it
        }
        }
        getFlashcards()
      }, [user])

      if (!isLoaded || !isSignedIn) {
        return <div>Loading...</div> 
    }

        if (error) {
        return <div>Error: {error}</div> // Display error message
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100vw">
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcardSets.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                    <CardContent>
                      <Typography variant="h6">
                        {flashcard.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )
  }