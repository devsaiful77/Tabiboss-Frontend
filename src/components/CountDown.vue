<template>
    <div class="countdown">
        <div class="time-box" v-for="(value, label) in time" :key="label">
            <span class="time-value">{{ value }}</span>
            <span class="time-label">{{ label }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["deadline"],

    data() {
        return {
            time: {
                d: "00",
                h: "00",
                m: "00",
                s: "00",
            },
            timer: null,
        };
    },

    methods: {
        updateTimer() {
            const targetDate = new Date(this.deadline).getTime(); // পাস করা ডেডলাইন থেকে সময় বের করা
            const now = Date.now(); // বর্তমান সময়
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(this.timer); // টাইমার বন্ধ করা
                this.time = { d: "00", h: "00", m: "00", s: "00" };
                return;
            }

            // সময় হিসাব
            this.time = {
                d: Math.floor(distance / (1000 * 60 * 60 * 24)).toString(),
                h: Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ).toString(),
                m: Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                ).toString(),
                s: Math.floor((distance % (1000 * 60)) / 1000).toString(),
            };
        },
    },

    mounted() {
        this.updateTimer(); // প্রথমবার কল
        this.timer = setInterval(this.updateTimer, 1000); // প্রতি ১ সেকেন্ডে কল
    },

    beforeUnmount() {
        clearInterval(this.timer); // কম্পোনেন্ট বন্ধ হলে টাইমার বন্ধ
    },
};

// export default {
//   props: ['deadline'],
//   data() {
//     return {
//       time: {
//         d: "00",
//         h: "00",
//         m: "00",
//         s: "00",
//       },
//       targetDate:
//         Date.now() +
//         12 * 60 * 60 * 1000 * 62 +
//         12 * 60 * 60 * 1000 +
//         12 * 60 * 1000 +
//         50 * 1000, // 32d 12h 12m 50s
//       timer: null,
//     };
//   },
//   methods: {
//     updateTimer() {
//       const now = Date.now();
//       const distance = this.targetDate - now;

//       if (distance <= 0) {
//         clearInterval(this.timer);
//         this.time = { d: "00", h: "00", m: "00", s: "00" };
//         return;
//       }

//       this.time = {
//         d: Math.floor(distance / (1000 * 60 * 60 * 24)).toString(),
//         h: Math.floor(
//           (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//         ).toString(),
//         m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString(),
//         s: Math.floor((distance % (1000 * 60)) / 1000).toString(),
//       };
//     },
//   },
//   mounted() {
//     this.updateTimer(); // Initialize immediately
//     this.timer = setInterval(this.updateTimer, 1000);
//   },
//   beforeUnmount() {
//     clearInterval(this.timer);
//   },
// };
</script>
