"use client"
import React from 'react'

type Achievement = {
    metric: string;
    value: number;
    postfix?: string;
    prefix?: string;
};

const achievementsList: Achievement[] = [
    {
        metric: "Projects",
        value: 3,
        postfix: "+",
    },
    {
        metric: "Years",
        value: 3,
        postfix: "+",
    },
    {
        metric: "Languages",
        value: 2,
    },
    {
        metric: "Community",
        value: 5,
        postfix: "+",
    }

]

const AchievementsSection = () => {
    return (
        <div className='py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
            <div className='border-[--bcolor] border rounded-md py-8 px-16 md:flex md:flex-row items-center justify-between'>
                {achievementsList.map((achievement, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center justify-center mx-4'>
                            <h2 className='text-[--primary] text-4xl font-bold mt-3'>{achievement.prefix}{achievement.value}{achievement.postfix}</h2>
                            <p className='text-[--secondary] text-base mb-3'>{achievement.metric}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AchievementsSection