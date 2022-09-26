<template>
    <section class="weather">
        <div class="weather__wrapper">
            <div class="weather__inner">
                <div class="weather__top">
                    <h1 class="weather__title" v-if="location.name">{{ location.country }} / {{ location.name }}</h1>
                </div>

                <input type="text" v-model="getCityName" class="input" placeholder="Enter city name">
                <button @click="getWeather" class="btn">Get Weather</button>

                <div class="weather__days-count">
                    <p @click="setDays(1)">1 day</p>
                    <p @click="setDays(3)">3 days</p>
                    <p @click="setDays(5)">5 days</p>
                </div>
            </div>

            <div class="weather__bottom">
                <div class="weather__error" v-if="status !== 200">
                    <h2>No such country in this api :(</h2>
                </div>
                <div class="weather__day" v-else v-for="day in forecast" :key="day.dt_txt">
                    <div class="weather__info time">
                        <p>Date: <span>{{ day.dt_txt.split(' ')[0].replaceAll('-', '/') }}</span></p>
                    </div>

                    <div class="weather__info temp">
                        <p>Temperature: <span>{{ day.main.temp }} C</span></p>
                    </div>

                    <div class="weather__info wind">
                        <p>Wind: <span>{{ day.wind.speed }} km/h</span></p>
                    </div>

                    <div class="weather__info humidity">
                        <p>Humidity: <span>{{ day.main.humidity }} %</span></p>
                    </div>

                    <div class="weather__info sky-cond">
                        <p>Sky condition: <span>{{ day.weather[0].description }}</span></p>
                    </div>

                    <div class="weather__info image">
                        <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: "GetWeather",
    data() {
        return {
            apiKey: '5678f34c397a968ad27d1f78fcb566ab',
            getCityName: 'London',
            location: [],
            forecast: [],
            date: new Date,
            daysCount: 1,
            status: 0,
        }
    },
    methods: {
        getWeather() {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.getCityName}&units=metric&appid=${this.apiKey}`)
                .then(response => {
                    this.forecast = Array.from(response.data.list).filter((val, i) => i % 8 === 0).filter((val, i) => i < this.daysCount);
                    this.location = response.data.city;
                    this.status = response.status;
                })
                .catch(error => {
                    this.status = error.response.status;
                })
        },
        setDays(days) {
            this.daysCount = days;
            this.getWeather();

            return this.daysCount;
        }
    },
    mounted() {
        this.getWeather();
    }
}
</script>

<style lang="scss" scoped>
    h1,
    p {
        color: var(--color-white);
    }

    h1 {
        font-size: 48px;
        margin-bottom: 10px;
    }

    p {
        font-size: 24px;
    }

    .input {
        padding: 10px;
        background-color: transparent;
        border-bottom: 3px solid var(--color-bg);
        font-family: var(--font-main);
        font-size: 28px;
        color: var(--color-white);
        margin-top: auto;
        max-width: 600px;
        width: 40%;
        min-width: 300px;

        &::placeholder {
            color: var(--color-darkgrey);
        }
    }

    .btn {
        width: 200px;
        max-width: 100%;
        padding: 10px 20px;
        border-radius: 6px;
        background-color: var(--color-lightblue);
        font-family: var(--font-main);
        border: none;
        cursor: pointer;
        font-size: 20px;
        color: var(--color-white);
        margin-top: 15px;
    }

    .weather {
        background: url("/src/assets/images/background.webp") no-repeat center/cover;
        min-height: 100vh;
        display: flex;

        &__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            flex: 1;
            overflow-x: hidden;
        }

        &__inner {
            padding: 50px 4vw;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            position: relative;
        }

        &__top {
            align-self: flex-start;
        }

        &__title {
            padding: 10px 15px;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        &__bottom {
            padding: 50px 4vw;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(6px);
            width: 100%;
            display: flex;
            gap: 15px;
            overflow-x: auto;
            overflow-y: auto;

            scrollbar-width: thin;
            scrollbar-color: var(--color-lightblue) transparent;

            &::-webkit-scrollbar {
                width: 4px;
                height: 8px;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background-color: var(--color-lightblue);
                border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
        }

        &__days-count {
            position: absolute;
            left: 0;
            bottom: 0;
            display: flex;
            gap: 10px;
            background-color: rgba(255, 255, 255, 0.3);
            padding: 5px 0;

            p {
                cursor: pointer;
                padding: 10px;

                &:not(:last-child) {
                    border-right: 1px solid var(--color-darkgrey);
                }
            }
        }

        &__day {
            display: grid;
            grid-gap: 15px;
            border-right: 1px solid #0f3b50;
            padding: 10px 20px 10px 0;
            flex: none;

            p {
                span {
                    font-size: 20px;
                    color: var(--color-lightblue);
                }
            }
        }

        &__info {
            &.image {
                width: 80px;
                height: 80px;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                }
            }
        }

        &__error {
            color: var(--color-white);
            font-size: 28px;
            width: 100%;
            text-align: center;
        }
    }

    @media only screen and (max-width: 768px) {
        h1 {
            font-size: 40px;
        }

        p {
            font-size: 18px;
        }

        .input {
            font-size: 20px;
        }

        .weather {
            &__bottom {
                padding: 30px 4vw;
            }

            &__days-count {
                p {
                    padding: 7px;
                }
            }

            &__day {
                p {
                    span {
                        font-size: 16px;
                    }
                }
            }

            &__info {
                &.image {
                    width: 64px;
                    height: 64px;
                }
            }
        }
    }

    @media only screen and (max-width: 428px) {
        h1 {
            font-size: 32px;
        }
    }
</style>