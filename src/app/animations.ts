import {
  trigger,
  transition,
  style,
  query,
  animate,
  group,
  stagger,
  state,
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':leave', [stagger(100, [animate('0.5s', style({ opacity: 0 }))])], {
      optional: true,
    }),
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger(100, [animate('0.5s', style({ opacity: 1 }))]),
      ],
      { optional: true }
    ),
  ]),
]);
trigger('enterAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate(
      '500ms',
      style({
        transform: 'translateX(0)',
        opacity: 1,
        'overflow-x': 'hidden',
      })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
  ]),
]),
  trigger('slideIn', [
    state('*', style({ 'overflow-y': 'hidden' })),
    state('void', style({ 'overflow-y': 'hidden' })),
    transition('* => void', [
      style({ height: '*' }),
      animate(250, style({ height: 0 })),
    ]),
    transition('void => *', [
      style({ height: '0' }),
      animate(250, style({ height: '*' })),
    ]),
  ]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ [direction]: '100%' }))],
        optional
      ),
      query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))]),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
