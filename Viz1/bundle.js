(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  vega = vega && Object.prototype.hasOwnProperty.call(vega, 'default') ? vega['default'] : vega;
  vegaLite = vegaLite && Object.prototype.hasOwnProperty.call(vegaLite, 'default') ? vegaLite['default'] : vegaLite;
  vl = vl && Object.prototype.hasOwnProperty.call(vl, 'default') ? vl['default'] : vl;

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 9,
        fill: dark
      },
      "guide-title": {
        fontSize: 20,
        fill: dark
      }
    }
  };

  const csvUrl = 'https://gist.githubusercontent.com/lintonylin/4f9ba13dc37b7510ea392d95c494f891/raw/fde045654ba7b84c7e96411061a8919ebbdf4dc3/Space_Corrected.csv';
  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl
    .markBar()
  	.transform(
  	vl.groupby('Company Name', 'Status Mission').aggregate(vl.count().as('Count')),
  	)
    .encode(
      vl.x().fieldQ('Count'),
      vl.y().fieldN('Company Name').sort('Count'),
      vl.color().fieldN('Status Mission'),
      vl.tooltip([vl.fieldN('Company Name'), vl.fieldN('Count')])
    );

  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.body.appendChild(await marks.render());
  };
  run();

}(vega, vegaLite, vl, vegaTooltip, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImdldERhdGEuanMiLCJ2aXouanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBcHBlYXJhbmNlIGN1c3RvbWl6YXRpb24gdG8gaW1wcm92ZSByZWFkYWJpbGl0eS5cbi8vIFNlZSBodHRwczovL3ZlZ2EuZ2l0aHViLmlvL3ZlZ2EtbGl0ZS9kb2NzL1xuY29uc3QgZGFyayA9ICcjM2UzYzM4JztcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIGF4aXM6IHtcbiAgICBkb21haW46IGZhbHNlLFxuICAgIHRpY2tDb2xvcjogJ2xpZ2h0R3JheSdcbiAgfSxcbiAgc3R5bGU6IHtcbiAgICBcImd1aWRlLWxhYmVsXCI6IHtcbiAgICAgIGZvbnRTaXplOiA5LFxuICAgICAgZmlsbDogZGFya1xuICAgIH0sXG4gICAgXCJndWlkZS10aXRsZVwiOiB7XG4gICAgICBmb250U2l6ZTogMjAsXG4gICAgICBmaWxsOiBkYXJrXG4gICAgfVxuICB9XG59OyIsImltcG9ydCB7IGNzdiB9IGZyb20gJ2QzJztcblxuY29uc3QgY3N2VXJsID0gJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vbGludG9ueWxpbi80ZjliYTEzZGMzN2I3NTEwZWEzOTJkOTVjNDk0Zjg5MS9yYXcvZmRlMDQ1NjU0YmE3Yjg0YzdlOTY0MTEwNjFhODkxOWViYmRmNGRjMy9TcGFjZV9Db3JyZWN0ZWQuY3N2JztcbmV4cG9ydCBjb25zdCBnZXREYXRhID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgY3N2KGNzdlVybCk7XG4gIFxuICAvLyBIYXZlIGEgbG9vayBhdCB0aGUgYXR0cmlidXRlcyBhdmFpbGFibGUgaW4gdGhlIGNvbnNvbGUhXG4gIGNvbnNvbGUubG9nKGRhdGFbMF0pO1xuXG4gIHJldHVybiBkYXRhO1xufTsiLCJpbXBvcnQgdmwgZnJvbSAndmVnYS1saXRlLWFwaSc7XG5leHBvcnQgY29uc3Qgdml6ID0gdmxcbiAgLm1hcmtCYXIoKVxuXHQudHJhbnNmb3JtKFxuXHR2bC5ncm91cGJ5KCdDb21wYW55IE5hbWUnLCAnU3RhdHVzIE1pc3Npb24nKS5hZ2dyZWdhdGUodmwuY291bnQoKS5hcygnQ291bnQnKSksXG5cdClcbiAgLmVuY29kZShcbiAgICB2bC54KCkuZmllbGRRKCdDb3VudCcpLFxuICAgIHZsLnkoKS5maWVsZE4oJ0NvbXBhbnkgTmFtZScpLnNvcnQoJ0NvdW50JyksXG4gICAgdmwuY29sb3IoKS5maWVsZE4oJ1N0YXR1cyBNaXNzaW9uJyksXG4gICAgdmwudG9vbHRpcChbdmwuZmllbGROKCdDb21wYW55IE5hbWUnKSwgdmwuZmllbGROKCdDb3VudCcpXSlcbiAgKTsiLCJpbXBvcnQgdmVnYSBmcm9tICd2ZWdhJztcbmltcG9ydCB2ZWdhTGl0ZSBmcm9tICd2ZWdhLWxpdGUnO1xuaW1wb3J0IHZsIGZyb20gJ3ZlZ2EtbGl0ZS1hcGknO1xuaW1wb3J0IHsgSGFuZGxlciB9IGZyb20gJ3ZlZ2EtdG9vbHRpcCc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnLi9nZXREYXRhJztcbmltcG9ydCB7IHZpeiB9IGZyb20gJy4vdml6JztcblxudmwucmVnaXN0ZXIodmVnYSwgdmVnYUxpdGUsIHtcbiAgdmlldzogeyByZW5kZXJlcjogJ3N2ZycgfSxcbiAgaW5pdDogdmlldyA9PiB7IHZpZXcudG9vbHRpcChuZXcgSGFuZGxlcigpLmNhbGwpOyB9XG59KTtcblxuY29uc3QgcnVuID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBtYXJrcyA9IHZpelxuICAgIC5kYXRhKGF3YWl0IGdldERhdGEoKSlcbiAgICAud2lkdGgod2luZG93LmlubmVyV2lkdGgpXG4gICAgLmhlaWdodCh3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLmF1dG9zaXplKHsgdHlwZTogJ2ZpdCcsIGNvbnRhaW5zOiAncGFkZGluZycgfSlcbiAgICAuY29uZmlnKGNvbmZpZyk7XG4gIFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF3YWl0IG1hcmtzLnJlbmRlcigpKTtcbn07XG5ydW4oKTsiXSwibmFtZXMiOlsiY3N2IiwiSGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUFBO0VBQ0E7RUFDQSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUM7RUFDaEIsTUFBTSxNQUFNLEdBQUc7RUFDdEIsRUFBRSxJQUFJLEVBQUU7RUFDUixJQUFJLE1BQU0sRUFBRSxLQUFLO0VBQ2pCLElBQUksU0FBUyxFQUFFLFdBQVc7RUFDMUIsR0FBRztFQUNILEVBQUUsS0FBSyxFQUFFO0VBQ1QsSUFBSSxhQUFhLEVBQUU7RUFDbkIsTUFBTSxRQUFRLEVBQUUsQ0FBQztFQUNqQixNQUFNLElBQUksRUFBRSxJQUFJO0VBQ2hCLEtBQUs7RUFDTCxJQUFJLGFBQWEsRUFBRTtFQUNuQixNQUFNLFFBQVEsRUFBRSxFQUFFO0VBQ2xCLE1BQU0sSUFBSSxFQUFFLElBQUk7RUFDaEIsS0FBSztFQUNMLEdBQUc7RUFDSCxDQUFDOztFQ2hCRCxNQUFNLE1BQU0sR0FBRyxpSkFBaUosQ0FBQztFQUMxSixNQUFNLE9BQU8sR0FBRyxZQUFZO0VBQ25DLEVBQUUsTUFBTSxJQUFJLEdBQUcsTUFBTUEsTUFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2pDO0VBQ0E7RUFDQSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkI7RUFDQSxFQUFFLE9BQU8sSUFBSSxDQUFDO0VBQ2QsQ0FBQzs7RUNUTSxNQUFNLEdBQUcsR0FBRyxFQUFFO0VBQ3JCLEdBQUcsT0FBTyxFQUFFO0VBQ1osRUFBRSxTQUFTO0VBQ1gsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQy9FLEVBQUU7RUFDRixHQUFHLE1BQU07RUFDVCxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0VBQzFCLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0VBQy9DLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztFQUN2QyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUMvRCxHQUFHOztFQ0hILEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtFQUM1QixFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7RUFDM0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJQyxtQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtFQUNyRCxDQUFDLENBQUMsQ0FBQztBQUNIO0VBQ0EsTUFBTSxHQUFHLEdBQUcsWUFBWTtFQUN4QixFQUFFLE1BQU0sS0FBSyxHQUFHLEdBQUc7RUFDbkIsS0FBSyxJQUFJLENBQUMsTUFBTSxPQUFPLEVBQUUsQ0FBQztFQUMxQixLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0VBQzdCLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7RUFDL0IsS0FBSyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztFQUNuRCxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNwQjtFQUNBLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztFQUNsRCxDQUFDLENBQUM7RUFDRixHQUFHLEVBQUU7Ozs7In0=