<script setup lang="ts">
import Select from "primevue/select";
import { computed, onMounted, ref } from "vue";

const API_URL = "https://api.studentimarconi.org/orario";
const days = {
	monday: "Lunedì",
	tuesday: "Martedì",
	wednesday: "Mercoledì",
	thursday: "Giovedì",
	friday: "Venerdì",
};
type Day = keyof typeof days;
type Lesson = {
	class: string;
	room: string;
	subject: string;
};
type Timetable = Partial<Record<Day, Record<string, Lesson>>>;

const classes = ref<string[]>([]);
const rooms = ref<string[]>([]);
const selectedClass = ref<string | null>(null);
const selectedRoom = ref<string | null>(null);
const timetable = ref<Timetable | null>(null);
const loading = ref(false);
const error = ref("");

const hours = computed(() => {
	if (!timetable.value) return [];

	return [
		...new Set(
			(Object.keys(days) as Array<keyof typeof days>).flatMap((dayKey) =>
				Object.keys(timetable.value?.[dayKey] ?? {}).map(Number),
			),
		),
	].sort((a, b) => a - b);
});

onMounted(async function () {
	loading.value = true;
	try {
		const response = await fetch(API_URL);
		const data = await response.json();

		classes.value = data.classes ?? [];
		rooms.value = data.rooms ?? [];
	} catch {
		error.value = "Errore nel caricamento di classi e aule.";
	}
	loading.value = false;
});

async function loadTimetable(path: string) {
	loading.value = true;
	error.value = "";
	timetable.value = null;

	try {
		const response = await fetch(API_URL + path);

		if (!response.ok) throw new Error();

		timetable.value = await response.json();
	} catch {
		error.value = "Errore nel caricamento dell'orario.";
	} finally {
		loading.value = false;
	}
}

function onClassChange(value: string | null) {
	selectedClass.value = value;
	selectedRoom.value = null;

	if (!value) {
		timetable.value = null;
		error.value = "";
		return;
	}
	loadTimetable(`/class/${encodeURIComponent(value)}`);
}

function onRoomChange(value: string | null) {
	selectedRoom.value = value;
	selectedClass.value = null;

	if (!value) {
		timetable.value = null;
		error.value = "";
		return;
	}

	loadTimetable(`/room/${encodeURIComponent(value)}`);
}
</script>

<template>
	<div>
		<Select
			:modelValue="selectedClass"
			:options="classes"
			placeholder="Classe"
			showClear
			@update:modelValue="onClassChange"
		/>

		<Select
			:modelValue="selectedRoom"
			:options="rooms"
			placeholder="Aula"
			showClear
			@update:modelValue="onRoomChange"
		/>

		<p v-if="loading">Caricamento...</p>
		<p v-else-if="error">{{ error }}</p>

		<table v-else-if="timetable && hours.length">
			<thead>
				<tr>
					<th>Ora</th>
					<th v-for="(label, key) in days" :key="key">
						{{ label }}
					</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="hour in hours" :key="hour">
					<td>{{ hour }}</td>

					<td v-for="(label, key) in days" :key="key">
						<template v-if="timetable[key]?.[hour]">
							<div>{{ timetable[key][hour].subject }}</div>
							<div>{{ timetable[key]?.[hour]?.room }}</div>
							<div>{{ timetable[key]?.[hour]?.class }}</div>
						</template>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
