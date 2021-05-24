import './Loading.scss';
export function Loading() {
  return (
    <div class="loading">
      <div class="loader column">
        <div class="row text-center">
          <img class="row" src="/img/loading-nobg.gif"></img>
        </div>
        <div class="row justify-content-md-center">
            <h2> Aguarde...</h2>
        </div>
      </div>
    </div>
  );
}
