"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Calendar, Smile } from "lucide-react"
import Image from "next/image"
import { getPhotoStory } from "@/data/photoStories"

export default function FlipPhotoCard({ photo, index, isActive, onCardClick, onFlip }) {
    const [isFlipped, setIsFlipped] = useState(false)
    const story = getPhotoStory(photo.id)

    // Reset flip state when card becomes inactive
    useEffect(() => {
        if (!isActive && isFlipped) {
            setIsFlipped(false)
        }
    }, [isActive, isFlipped])

    const handleFlip = () => {
        const newFlipState = !isFlipped
        setIsFlipped(newFlipState)
        if (onFlip) {
            onFlip(photo.id, newFlipState)
        }
    }

    const handleCardClick = () => {
        console.log(`Card clicked - Photo ID: ${photo.id}, Is Active: ${isActive}`)
        if (onCardClick) {
            onCardClick(photo.id)
        }
    }

    return (
        <div className="relative w-full h-full perspective-1000">
            <motion.div
                className="relative w-full h-full transform-style-preserve-3d cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={isActive ? handleFlip : handleCardClick}
            >
                {/* Front side - Photo */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                    <motion.div
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="w-full h-full flex items-center justify-center relative">
                            <Image
                                fill
                                sizes="300px"
                                src={photo.src}
                                alt="Our memory"
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Photo overlay with flip hint */}
                            <motion.div
                                className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            >
                                <motion.div
                                    className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Heart className="w-6 h-6 text-white fill-current" />
                                </motion.div>
                            </motion.div>
                            
                            {/* Photo number indicator */}
                            <div className="absolute top-3 left-3 bg-pink-500/80 backdrop-blur-sm text-white text-sm font-semibold px-2 py-1 rounded-full">
                                #{photo.id}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Back side - Story */}
                <div className="absolute inset-0 w-full h-full backface-hidden transform rotateY-180">
                    <motion.div
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-950/90 to-purple-950/90 backdrop-blur-sm border border-pink-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="p-6 h-full flex flex-col justify-between text-white">
                            {/* Story content */}
                            <div className="flex-1">
                                <motion.h3
                                    className="text-xl font-bold text-pink-300 mb-3"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {story.title}
                                </motion.h3>
                                
                                <motion.p
                                    className="text-pink-100 leading-relaxed text-sm mb-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {story.story}
                                </motion.p>
                            </div>

                            {/* Story metadata */}
                            <motion.div
                                className="space-y-2"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center text-pink-200 text-xs">
                                    <Calendar className="w-3 h-3 mr-2" />
                                    {story.date}
                                </div>
                                <div className="flex items-center text-pink-200 text-xs">
                                    <Smile className="w-3 h-3 mr-2" />
                                    {story.mood}
                                </div>
                            </motion.div>

                            {/* Flip back hint */}
                            <motion.div
                                className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Heart className="w-4 h-4 text-white fill-current" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
