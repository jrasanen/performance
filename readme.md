
# Performance metrics

## DESCRIPTION

Measure node performance metrics.

## REQUIREMENTS

* Node.js
* TypeScript

## USAGE

```
import { checkpoints } from 'performance';

checkpoints.create('making coffee');
checkpoints.create('making coffee');
checkpoints.timings(); // [['making coffee', '123ms']]

```

# LICENSE

MIT