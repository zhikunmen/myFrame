#!/usr/bin/python
# -*- coding: utf-8 -*-

import os,os.path,re,sys,string
import dircache
import re,xml.dom.minidom,codecs
import platform
import binascii
import json
import traceback
import re
import shutil

HTML5_DIR = "../release/html5/"
PUBLISH_DIR = "../release/html5/publish/"
#if platform.system() == "Windows":
	#HTML5_DIR = "..\\\\release/html5/"
	#PUBLISH_DIR = "..\\\\release/html5/publish/"

def cmp1(x,y):
        return  y - x

def checkempty(srcdir):
        files = dircache.listdir(srcdir)
	print srcdir,len(files)
	return len(files)

def getnewdir(srcdir):
	dirlist = []
        files = dircache.listdir(srcdir)
        for file in files:
                if os.path.isdir(srcdir  + "/" +  file) and file.isdigit():
                        dirlist.append(int(file))
	if len(dirlist) > 0:
		dirlist.sort(cmp1)
		return str(dirlist[0])
	return ""

def changefile(dstdir,dstfile,dic,prefix,basename):
	#if dstfile.find("release/html5/") == -1:
	#	return
	if os.path.isfile(dstdir + "/" + dstfile) == False:
		return
	print dstdir + "/" + dstfile
	global changenum
	global changefilenum
	dst = open(dstdir + "/" + dstfile,"r")
	dstlines = dst.readlines()
	dst.close()
	dst = open(dstdir + "/" + dstfile,"w")
	i = 0
	j = 0
	first = True
	for dstline in dstlines:
		tmp = dstline
		for k , v in dic.iteritems():
			k = k.replace(prefix,"")
			if basename == True:
				k = os.path.basename(k)
				#print k
			if tmp.find(k) != -1:
				tmp = re.sub('\?v=.*?"','"',tmp)
				tmp = tmp.replace(k,"%s?v=%s"%(k , v))
				if tmp != dstline:
					dstline = tmp
					if first == True:
						first = False
						print dstfile,dstline
		dst.write(dstline)

	dst.close()

def crc32(filename):
	if not filename or not os.path.exists(filename): return '0'
	res = 0
	try:
		fd = open(filename, "rb")
		res = binascii.crc32(fd.read())
		if res < 0:
			res = ~res ^ 0xffffffff
	except:
		err = traceback.format_exc()
		print err
	finally:
		fd.close()
	return '%x'%res

def changefilename(filename, path=""):
	fileext  = os.path.splitext(filename)
	crc32str = crc32(os.path.join(path, filename))
	return fileext[0] + "_" + crc32str + fileext[1]

def copytree(src, dst, symlinks=False):
	if os.path.basename(src) != os.path.basename(dst):
		dst = os.path.join(dst , os.path.basename(src)) 
	names = os.listdir(src)
	if not os.path.isdir(dst):
		os.makedirs(dst)
		  
	errors = []
	for name in names:
		srcname = os.path.join(src, name)
		dstname = os.path.join(dst, name)
		if symlinks and os.path.islink(srcname):
			linkto = os.readlink(srcname)
			os.symlink(linkto, dstname)
		elif os.path.isdir(srcname):
			copytree(srcname, dstname, symlinks)
		else:
			if os.path.isdir(dstname):
				print "new dir:" ,dstname
				assert(0)
			elif os.path.isfile(dstname):
				os.remove(dstname)
			else:
				print "new file:" ,dstname
			shutil.copy2(srcname, dstname)


if __name__ == "__main__":
	os.chdir("Egret/")
	outDir = "../release"
	releaseDir = "release"#发布目录
	ret = os.system('egret build -e')
	if ret == 0:
		ret = os.popen('egret publish --version dev')
		ret = ret.read()
		releaseDir = ret[ret.rfind("：")+3:] 
		releaseDir = releaseDir.replace("\n","")
	# print "bin-release/web/"+releaseDir
	os.chdir("bin-release/web/"+releaseDir+"/")
	src = open("resource/mahjong.res.json")
	mjres = json.loads(src.read())
	src.close()
	res_list = mjres.get("resources",[])
	assert type(res_list)==list
	for res in res_list:
		filename = res.get("url")
		if not filename: continue
		fileext  = os.path.splitext(filename)
		oldPath = os.path.join("resource", filename)
		crc32str = crc32(oldPath)
		fileurl = fileext[0] + "_" + crc32str + fileext[1]
		os.rename(oldPath,os.path.join("resource", fileurl))
		res['url'] = fileurl
		ftype = res.get("type")
		if ftype == "sheet":
			pngPath = oldPath.replace(".json",".png")
			newPngPath = oldPath.replace(".json","_"+crc32str+".png")
			os.rename(pngPath,newPngPath)
		if ftype == "font":
			pngPath = oldPath.replace(".fnt",".png")
			newPngPath = oldPath.replace(".json","_"+crc32str+".png")
			os.rename(pngPath,newPngPath)

	src = open("resource/mahjong.res.json", 'w')
	src.write(json.dumps(mjres, indent=4))
	src.close()

	src = open("index.html")
	data = src.read()
	src.close()
	r = re.compile(r"src=\"([^\"]*)\">")
	tmp_list = r.findall(data)
	for f in tmp_list:
		newname = changefilename(f)
		os.rename(f,newname)
		data = data.replace(f, newname)
	
	#version
	resvp = '<meta name="res-version" content="" />'
	desvp = '<meta name="res-version" content="'+crc32("resource/mahjong.res.json")+'" />'
	data = data.replace(resvp, desvp)
	if os.path.exists("resource/mahjong.thm.json"):
		resvp = '<meta name="thm-version" content="" />'
		desvp = '<meta name="thm-version" content="'+crc32("resource/mahjong.thm.json")+'" />'
		data = data.replace(resvp, desvp)
	src = open("index.html", "w")
	src.write(data)
	src.close()
	# srclines = src.readlines()
	#copy dir
	copytree(".","../../../../release")
	os.chdir("../../../../release")

	cmd = 'git commit . -m "publish auto commit"'
	os.system(cmd)
	cmd = "git pull"
	docmd(cmd)
	cmd = 'git push'
	os.system(cmd)

	if platform.system() == "Windows":
		ret = os.system('pause')

