import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib
from mpl_toolkits.axes_grid1 import make_axes_locatable
import os
import geopandas as gpd
import imageio
import transbigdata as tbd
from shapely.wkt import loads


def create_gif(image_list, gif_name, duration=1.0):
	'''
	:param image_list: 这个列表用于存放生成动图的图片
	:param gif_name: 字符串，所生成gif文件名，带.gif后缀
	:param duration: 图像间隔时间
	:return:
	'''
	frames = []
	for image_name in image_list:
		frames.append(imageio.imread(image_name))

	imageio.mimsave(gif_name, frames, 'GIF', duration=duration)

def get_start_change_areas(time = [14, 17]):
	from mycolorpy import colorlist as mcp
	font = {# 'weight': 'bold',
		'size': 22}
	matplotlib.rc('font', **font)

	# ---------change time----------
	change_time = False
	# ----------------------------
	if change_time:
		# with_suffix = "_change_time"
		# with_suffix = "_add1h_100agents"
		with_suffix = "_2h15"
		with_suffix = "_phase"

	else:
		with_suffix = ""

	# bounds = [-122.8, 37.8, -122.40, 38.2]
	# bounds = [-122.62, 37.96, -122.51, 38.02]

	# bounds = [-122.62, 37.96, -122.56, 38.02] #fairfax
	bounds = [-122.9, 38.04, -122.8, 38.15] #inverness_scn1
	# bounds = [-122.9, 38.03, -122.73, 38.15] #inverness_scn2
	# bounds = [-122.56, 38.03, -122.51, 38.07] #novato_scn1_1_os
	# bounds = [-122.58, 37.96, -122.50, 38.02] #sanrafael_scn2_os
	# bounds = [-122.59, 37.86, -122.51, 37.92] #tamalpais_scn1_os

	image_list = []

	# save_file = "fairfax_scn1_fs"
	save_file = "inverness_scn1_fs"
	# save_file = "inverness_scn2_os"
	# save_file = "novato_scn1_1_os"
	# save_file = "sanrafael_scn2_os"
	# save_file = "tamalpais_scn1_os"

	t=time[0]
	times = 0
	while t<=time[1]:
		# fairfax_scn1
		time_file = "visualization_outputs/{}_starting_points{}/tmp_time{}_{}.csv".format(save_file, with_suffix, t, t+1200)

		agents = pd.read_csv(time_file)
		fig, ax = plt.subplots(1, 1, figsize=(20, 20))
		divider = make_axes_locatable(ax)
		if t>24*3600:
			ax.set_title("Map: time{0:02.0f}:{1:02.0f}--{2:02.0f}:{3:02.0f}".format(*divmod((t/3600-24) * 60,60), *divmod(((t+1200)/3600-24) * 60,60)))
		else:
			left_time = divmod(t/ 60,60)
			right_time = divmod((t+1200) / 60, 60)
			ax.set_title("Map: time{0:02.0f}:{1:02.0f}--{2:02.0f}:{3:02.0f}".format(left_time[0],left_time[1], right_time[0],right_time[1]))
		ax.set_xlabel("Longitude")
		ax.set_ylabel("Latitude")
		ax.ticklabel_format(useOffset=False)

		plt.sca(ax)
		tbd.plot_map(plt, bounds, zoom=15, style=4)

		plt.xlim(bounds[0], bounds[2])
		plt.ylim(bounds[1], bounds[3])

		agents = gpd.GeoDataFrame(agents, crs='epsg:3857', geometry=agents['agent_position'].map(loads))
		agents.plot(lw=7, ax=ax,color="red")# cax=cax

		fig.patch.set_facecolor('white')
		fig.patch.set_alpha(0.7)
		# plt.show()

		if not os.path.exists("visualization_outputs/link_stats_{}_base_time{}".format(save_file, with_suffix)):
			os.mkdir("visualization_outputs/link_stats_{}_base_time{}".format(save_file, with_suffix))
		plt.savefig('visualization_outputs/link_stats_{}_base_time{}/time{}_{}.png'.format(save_file, with_suffix, t, t+1200), transparent=False)
		plt.close()
		image_list.append('visualization_outputs/link_stats_{}_base_time{}/time{}_{}.png'.format(save_file, with_suffix, t, t+1200))
		print('visualization_outputs/link_stats_{}_base_time{}/time{}_{}.png'.format(save_file, with_suffix, t, t+1200))

		t=t+1200
	gif_name = "visualization_outputs/link_stats_{}_base_time{}/time{}_{}.gif".format(save_file, with_suffix, time[0], time[1])
	duration = 2
	create_gif(image_list, gif_name, duration)


test_time = [3000, 9000]  # inverness_scn1_fs
get_start_change_areas(time = test_time)
