<template>
    <div class="page-container">
        <div class="row">
            <div class="col-md-6">
                <div class="table-container">
                    <table class="custom-table">
                        <thead>
                            <tr>
                                <th class="column-hash">#</th>
                                <th class="column-checkbox">
                                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                                        aria-label="Select all" />
                                </th>
                                <th class="column-icon">Icon</th>
                                <th class="column-name sortable" @click="sortBy('name')">
                                    Name
                                    <i class="fas fa-sort sort-icon"></i>
                                </th>
                                <th class="column-imei sortable" @click="sortBy('imei')">
                                    IMEI
                                    <i class="fas fa-sort sort-icon"></i>
                                </th>
                                <th class="column-sim sortable" @click="sortBy('sim')">
                                    Sim Number
                                    <i class="fas fa-sort sort-icon"></i>
                                </th>
                                <th class="column-actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isLoading">
                                <td :colspan="7" class="loading-cell">
                                    <p>Loading data...</p>
                                    <!-- يمكنك وضع Skeleton Loader هنا إذا أردت -->
                                </td>
                            </tr>
                            <tr v-else-if="deviceData.length === 0">
                                <td :colspan="7" class="no-data-cell">
                                    <p>No data available.</p>
                                </td>
                            </tr>
                            <tr v-for="(item, index) in deviceData" :key="item.id" v-else>
                                <td class="cell-hash"><span>{{ item.id }}</span></td>
                                <td class="cell-checkbox">
                                    <input type="checkbox" v-model="item.selected" :aria-label="`Select item ${item.id}`" />
                                </td>
                                <td class="cell-icon">
                                    <img :src="item.iconUrl" alt="Icon" class="item-icon" />
                                </td>
                                <td class="cell-name">{{ item.name }}</td>
                                <td class="cell-imei">{{ item.imei }}</td>
                                <td class="cell-sim">{{ item.sim }}</td>
                                <td class="cell-actions">
                                    <button class="action-btn" aria-label="Download">
                                        <i class="fas fa-arrow-down"></i>
                                    </button>
                                    <button class="action-btn" aria-label="Delete">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                    <button class="action-btn" aria-label="Edit">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-md-6">
                <div class="map-container" style="height: 600px; width: 100%; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.4699813683365!2d31.2175942151155!3d30.080774581872663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA0JzUwLjgiTiAzMcKwMTMnMDkuMyJF!5e0!3m2!1sen!2seg!4v1629999999999!5m2!1sen!2seg" 
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const isLoading = ref(true);
const deviceData = ref([]);
const selectAll = ref(false);

const mockData = [
    { id: 1, selected: false, iconUrl: 'https://i.imgur.com/q36rD2A.png', name: '5692 UHJ', imei: '869595060889176', sim: '+966830031919986' },
    { id: 2, selected: false, iconUrl: 'https://i.imgur.com/q36rD2A.png', name: '9030.LEB', imei: '869595060904108', sim: '+966830031956509' },
    { id: 3, selected: false, iconUrl: 'https://i.imgur.com/q36rD2A.png', name: '1120.RXB', imei: '869595060880464', sim: '+966830031958072' },
    { id: 4, selected: false, iconUrl: 'https://i.imgur.com/q36rD2A.png', name: '2187 NSJ', imei: '869595060930236', sim: '+966830031920744' },
    { id: 5, selected: false, iconUrl: 'https://i.imgur.com/q36rD2A.png', name: '6479 G E B', imei: '869595060923314', sim: '+966830031956383' },
    { id: 6, selected: false, iconUrl: 'https://i.imgur.com/q36rD2A.png', name: '2448 GEB', imei: '869595061340765', sim: '+966830035052970' },
];

onMounted(() => {
    setTimeout(() => {
        deviceData.value = mockData;
        isLoading.value = false;
    }, 1500);
});

const toggleSelectAll = () => {
    deviceData.value.forEach(item => {
        item.selected = selectAll.value;
    });
};

const sortBy = (field) => {
    console.log(`Sorting by ${field}`);
    deviceData.value.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
    });
};
</script>

<style lang="scss" scoped>
.page-container {
    padding: 20px;
    font-family: Arial, sans-serif;
}

.page-title {
    margin-bottom: 20px;
}

.table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

// Table Header
thead {
    th {
        background-color: var(--main);
        color: white;
        padding: 12px 10px;
        text-align: left;
        font-weight: 600;
        font-size: 14px;
        border-right: 1px solid var(--main);

        &:first-child {
            border-top-left-radius: 8px;
        }

        &:last-child {
            border-top-right-radius: 8px;
            border-right: none;
        }

        &.sortable {
            cursor: pointer;
        }
    }
}

.sort-icon {
    margin-left: 5px;
    color: var(--main);
}


// Table Body
tbody {
    tr {
        border-bottom: 1px solid #ddd;

        &:nth-child(even) {
            background-color: #f9f9f9;
        }

        &:last-child {
            border-bottom: none;
        }
    }

    td {
        padding: 10px;
        font-size: 14px;
        vertical-align: middle;
        border-right: 1px solid #ddd;

        &:last-child {
            border-right: none;
        }
    }
}

// Column Specific Styles
.column-hash,
.cell-hash {
    width: 50px;
    text-align: center;
    background-color: var(--main);
    color: white;
    font-weight: bold;
}

.cell-hash {
    background-color: var(--main);
    border-right: 1px solid var(--main) !important;
}

.column-checkbox,
.cell-checkbox {
    width: 40px;
    text-align: center;
}

.column-icon,
.cell-icon {
    width: 60px;
    text-align: center;
}

.item-icon {
    width: 32px;
    height: auto;
    vertical-align: middle;
}


.cell-name,
.cell-imei,
.cell-sim {
    font-family: 'Consolas', 'Menlo', monospace;
}


.column-actions,
.cell-actions {
    width: 120px;
    text-align: center;
}

.cell-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #777;
    font-size: 1rem;
    padding: 0;

    &:hover {
        color: var(--main);
    }
}

// Input Styles
input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}

// Loading and No Data States
.loading-cell,
.no-data-cell {
    text-align: center;
    padding: 40px;
    color: #777;
    font-style: italic;
}
</style>