"use server"

import VoiceSession from "@/database/models/voice-session.model"
import { connectToDatabase } from "@/database/mongoose"
import { EndSessionResult, StartSessionResult } from "@/types"
import { getCurrentBillingPeriodStart } from "../subscription-constants"




export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {

        await connectToDatabase()
        //Todo: limit/plan to see if a session is allowed

        const session = await VoiceSession.create({
            clerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart: getCurrentBillingPeriodStart(),
            durationSeconds: 0
             })

        return {
            success: true,
            sessionId: session._id.toString()
            //maxDurationMinutes
        }
    } catch (e) {
        console.error("Error starting voice session", e)
        return {
            success: false,
            error: "Failed to start voice session"
        }
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {

    try {

        await connectToDatabase()

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        })

        if(!result) return {success: false, error: "Voice Session not found"}

        return {
            success: true
        }

    } catch (e) {
        console.error("Error ending session", e)
        return {
            success: false,
            error: "Failed to end voice session, please try again"
        }
    }

}