  <div class="main-wrapper" v-show="isShow">
    <div class="dialogue-cover"></div>
    <div class="dialogue-frame">
      <div class="dialogue">
        <p class="title" v-text="title || 'Title'"></p>
        <p class="message" v-text="message || 'Message'"></p>
        <div class="action">
          <p class="item emergency">
            <button key="yes" v-text="yes || 'Yes'"
            v-on:click="toggleModal"
            v-bind:options="{state:2, size:2}" ></button>
          </p>
          <p class="item">
            <button key="no"  v-text="no || 'No'"
            v-on:click="toggleModal"
            v-bind:options="{state:0, size:2}"></button>
          </p>
        </div>
      </div>
    </div>
  </div>
