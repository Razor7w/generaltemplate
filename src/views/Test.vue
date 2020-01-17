<template>
  <v-container
    class="fill-height"
    fluid
  >
    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <v-row>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                RxJS
              </div>
              <v-list-item-title class="headline mb-1">
                Ejercicios Simples
              </v-list-item-title>
              <v-col
                cols="6"
                md="6"
              >
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  <v-list-item three-line>
                    <div class="overline">
                      Contador: {{ countdown$ }}
                    </div>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col
                cols="6"
                md="6"
              >
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  <v-list-item three-line>
                    <div class="overline">
                      Contador: {{ countdown2$ }}
                    </div>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col
                cols="6"
                md="6"
              >
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  <v-card-text>
                    <div>X and Y in Screen</div>
                    <div class="text--primary">
                      X: {{ valorX }}<br>
                      Y: {{ valorY }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="6"
                md="6"
              >
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  <v-card-text>
                    <div>Petición With Axios</div>
                    <div class="text--primary">
                      {{ peticion$ }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-btn
            small
            color="primary"
            @click="openModal()"
          >
            Primary
          </v-btn>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          {{ peticion2$ }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { fromEvent, interval, Observable, forkJoin, of, timer } from 'rxjs'
  import { scan, startWith } from 'rxjs/operators'
  import { mapActions } from 'vuex'

  export default {
    subscriptions () {
      const countdown$ = interval(
        1000
      )
        .pipe(
          startWith(5),
          scan(time => time - 1)
        )
      const countdown2$ = interval(
        1000
      )
      const source$ = fromEvent(document, 'mousemove')

      const peticion$ = new Observable(subscriber => {
        this.axios.get('https://jsonplaceholder.typicode.com/users/1')
          .then((response) => {
            subscriber.next(response.data.name)
            subscriber.complete()
          })
          .catch((error) => {
            subscriber.error(error)
          })
      })
      const peticion2$ = forkJoin([
        of(1, 2, 3, 4),
        Promise.resolve(8),
        timer(4000),
        peticion$
      ])

      peticion2$.subscribe({
        next: value => console.log(value),
        complete: () => console.log('This is how it ends!')
      })

      const sumObserver = {
        sum: 0,
        next (value) {
          console.log('Adding: ' + value)
          this.sum = this.sum + value
        },
        error () {
          // We actually could just remove this method,
          // since we do not really care about errors right now.
        },
        complete () {
          console.log('Sum equals: ' + this.sum)
        }
      }

      of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
        .subscribe(sumObserver)
      return {
        countdown$,
        countdown2$,
        source$,
        peticion$,
        peticion2$
      }
    },
    computed: {
      valorX () {
        return (this.source$ && this.source$.clientX) ? this.source$.clientX : 0
      },
      valorY () {
        return (this.source$ && this.source$.clientY) ? this.source$.clientY : 0
      }
    },
    mounted () {
      this.pruebaRX()
    },
    methods: {
      ...mapActions(['changeModals']),
      pruebaRX () {
        const clicks = fromEvent(document, 'click')
        clicks.subscribe(x => console.log(x))
      },
      openModal () {
        var array = ['core-modal', 'core-modal']
        // array.push('core-modal')
        // console.log(array)
        array.pop()
        console.log(array)
        this.changeModals(array)
      }
    }
  }
</script>
