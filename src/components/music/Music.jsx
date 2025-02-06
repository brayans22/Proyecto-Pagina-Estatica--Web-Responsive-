import { useState, useEffect, useRef } from 'react';
import { Card } from '../card/Card.jsx';
import './music.css';

const musicList = [
    {
        img: '../../src/assets/photos/WWR/C30F950B-55E1-4A8C-B8C1-41A08959659B.jpeg',
        name: 'What Was Real',
        artist: 'BrayanJSR',
        music: '../../src/assets/music/Albums/WWR/1. What Was Real (Mastered).mp3'
    },
    {
        img: '../../src/assets/photos/Singles/WY.jpg',
        name: 'I\'m With You',
        artist: 'BrayanJSR',
        music: '../../src/assets/music/Albums/WWR/2. I\'m With You (Mastered).mp3'
    },
    // Agrega más canciones según sea necesario
];

export function Music() {
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [currentTime, setCurrentTime] = useState("00:00");
    const [totalDuration, setTotalDuration] = useState("00:00");
    const audioRef = useRef(new Audio(musicList[trackIndex].music));
    const seekRef = useRef(null);
    const volumeRef = useRef(null);

    useEffect(() => {
        audioRef.current.src = musicList[trackIndex].music;
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [trackIndex, isPlaying]);

    useEffect(() => {
        const updateTime = () => {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            if (!isNaN(duration)) {
                setCurrentTime(formatTime(current));
                setTotalDuration(formatTime(duration));
                if (seekRef.current) seekRef.current.value = (current / duration) * 100;
            }
        };

        audioRef.current.addEventListener("timeupdate", updateTime);
        return () => audioRef.current.removeEventListener("timeupdate", updateTime);
    }, []);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const playPauseTrack = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setTrackIndex((prevIndex) => (prevIndex + 1) % musicList.length);
    };

    const prevTrack = () => {
        setTrackIndex((prevIndex) => (prevIndex - 1 + musicList.length) % musicList.length);
    };

    const seekTo = () => {
        const seek = (seekRef.current.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seek;
    };

    const repeatTrack = () => {
        return 10;
    }

    const setVolume = () => {
        audioRef.current.volume = volumeRef.current.value / 100;
    };

    return (
        <div className="player">
            <div className="wrapper">
                <div className="details">
                    <div className="now-playing">Playing {trackIndex + 1} of {musicList.length}</div>
                    <div className="track-art" style={{ backgroundImage: `url(${musicList[trackIndex].img})` }}></div>
                    <div className="track-name">{musicList[trackIndex].name}</div>
                    <div className="track-artist">{musicList[trackIndex].artist}</div>
                </div>
                <div className="slider-container">
                    <div className="current-time">{currentTime}</div>
                    <input type="range" min="0" max="100" ref={seekRef} onChange={seekTo} className="seek_slider" />
                    <div className="total-duration">{totalDuration}</div>
                </div>
                <div className="slider-container">
                    <i className="fa fa-volume-down"></i>
                    <input type="range" min="0" max="100" ref={volumeRef} onChange={setVolume} className="volume_slider" defaultValue="99" />
                    <i className="fa fa-volume-up"></i>
                </div>
                <div className="buttons">
                    <div className="random-track" onClick={() => setIsRandom(!isRandom)}>
                        <i className={`fa fa-random fa-2x ${isRandom ? 'active' : ''}`} title="random"></i>
                    </div>
                    <div className="prev-track" onClick={prevTrack}>
                        <i className="fa fa-step-backward fa-2x"></i>
                    </div>
                    <div className="playpause-track" onClick={playPauseTrack}>
                        <i className={`fa fa-${isPlaying ? 'pause' : 'play'}-circle fa-5x`}></i>
                    </div>
                    <div className="next-track" onClick={nextTrack}>
                        <i className="fa fa-step-forward fa-2x"></i>
                    </div>
                    <div className="repeat-track" onClick={repeatTrack}>
                        <i className="fa fa-repeat fa-2x"></i>
                    </div>
                </div>
                <div id="wave">
                    {[...Array(7)].map((_, index) => (
                        <span key={index} className="stroke"></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Music;
