"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import FlipPhotoCard from "./FlipPhotoCard"

export default function PhotoScreen({ onNext }) {
    const [showButton, setShowButton] = useState(false)
    const [photos, setPhotos] = useState([])
    const [activePhotoId, setActivePhotoId] = useState(null)
    const [swiperRef, setSwiperRef] = useState(null)

    useEffect(() => {
        // Optimized image loading - stops when no more images are found
        const loadImages = async () => {
            try {
                const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
                const photos = []
                let consecutiveNotFound = 0
                const maxConsecutiveNotFound = 3 // Stop after 3 consecutive not found
                
                // Start from 1 and continue until we hit consecutive failures
                for (let i = 1; consecutiveNotFound < maxConsecutiveNotFound; i++) {
                    let found = false
                    
                    // Try each extension for this number
                    for (const ext of imageExtensions) {
                        const imagePath = `/images/${i}${ext}`
                        try {
                            // Test if image exists by creating an Image object
                            const img = new Image()
                            await new Promise((resolve, reject) => {
                                img.onload = () => resolve()
                                img.onerror = () => reject()
                                img.src = imagePath
                            })
                            photos.push({
                                id: i,
                                src: imagePath,
                            })
                            found = true
                            consecutiveNotFound = 0 // Reset counter
                            break // Found this number, move to next
                        } catch (error) {
                            // Image doesn't exist, continue to next extension
                        }
                    }
                    
                    if (!found) {
                        consecutiveNotFound++
                    }
                    
                    // Safety check to prevent infinite loops
                    if (i > 50) {
                        console.warn('Stopped image loading at 50 to prevent infinite loop')
                        break
                    }
                }
                
                console.log(`✅ Found ${photos.length} images:`, photos.map(p => p.src))
                setPhotos(photos)
            } catch (error) {
                console.error('Error loading images:', error)
                // Fallback to original hardcoded array if dynamic loading fails
                setPhotos([
                    { id: 1, src: "/images/1.jpg" },
                    { id: 2, src: "/images/2.jpg" },
                    { id: 3, src: "/images/3.jpg" },
                    { id: 4, src: "/images/4.jpg" },
                ])
            }
        }

        loadImages()
    }, [])

    useEffect(() => {
        // Show button after a delay
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // Set initial active photo when photos are loaded
    useEffect(() => {
        if (photos.length > 0 && activePhotoId === null) {
            setActivePhotoId(photos[0].id)
        }
    }, [photos, activePhotoId])

    const handleCardClick = (photoId) => {
        console.log(`Clicked photo ${photoId}`)
        setActivePhotoId(photoId)
        // Find the index of the clicked photo and slide to it
        const photoIndex = photos.findIndex(photo => photo.id === photoId)
        console.log(`Photo index: ${photoIndex}`)
        if (swiperRef && photoIndex !== -1) {
            console.log(`Sliding to index ${photoIndex}`)
            swiperRef.slideTo(photoIndex)
        }
    }

    const handleFlip = (photoId, isFlipped) => {
        // Optional: You can add additional logic here if needed
        console.log(`Photo ${photoId} flipped: ${isFlipped}`)
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            {/* Header section */}
            <motion.div
                className="text-center max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                <h1 className="text-2xl md:text-3xl text-pink-200 leading-relaxed mb-4 font-semibold">
                    From the first day I met you, life became <span className="text-pink-400 font-bold">brighter...</span>
                </h1>

                <motion.p
                    className="text-xl md:text-2xl text-purple-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    You've made every moment so special 💕
                </motion.p>
                
                <motion.p
                    className="text-sm text-pink-300/70 mt-2 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Click side photos to select • Click center photo to read story ✨
                </motion.p>
            </motion.div>

            {/* Photo carousel */}
            <motion.div
                className="w-full max-w-4xl mx-auto flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
            >
                {photos.length > 0 ? (
                    <Swiper
                        onSwiper={setSwiperRef}
                        effect={"coverflow"}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={"auto"}
                        allowTouchMove={true}
                        coverflowEffect={{
                            depth: 120,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        onSlideChange={(swiper) => {
                            const activeIndex = swiper.activeIndex
                            console.log(`Swiper slide changed to index: ${activeIndex}`)
                            if (photos[activeIndex]) {
                                setActivePhotoId(photos[activeIndex].id)
                            }
                        }}
                        modules={[EffectCoverflow, Pagination]}
                        className="photo-swiper"
                    >
                        {photos.map((photo, index) => (
                            <SwiperSlide key={photo.id} style={{ width: "300px", }}>
                                <FlipPhotoCard 
                                    photo={photo} 
                                    index={index}
                                    isActive={activePhotoId === photo.id}
                                    onCardClick={handleCardClick}
                                    onFlip={handleFlip}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="flex items-center justify-center h-96">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-pink-300/80">Loading memories...</p>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Continue button */}
            <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 50 }}
                transition={{ duration: 0.8 }}
            >
                <motion.p
                    className="text-pink-300/80 text-sm mb-6 italic"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                    Now for the most important part...
                </motion.p>

                <button
                    onClick={onNext}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center mx-auto pointer-events-auto"
                >
                    <Heart className="w-5 h-5 mr-2 fill-current heartbeat-animation" />
                    See the Message
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </motion.div>
        </motion.div>
    )
}
